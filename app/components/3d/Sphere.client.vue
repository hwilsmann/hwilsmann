<script setup lang="ts">
import type * as ThreeTypes from 'three'
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

let idleCallback: number | undefined
let idleTimeout: ReturnType<typeof setTimeout> | undefined

const CREAM = 0x00ab8a
const GREEN = 0x00ab8a
const RADIUS = 1.4
const COUNT = 900

const container = ref<HTMLElement | null>(null)

type ThreeModule = typeof import('three')

let THREE: ThreeModule | undefined

let renderer: ThreeTypes.WebGLRenderer | undefined
let scene: ThreeTypes.Scene | undefined
let camera: ThreeTypes.PerspectiveCamera | undefined
let group: ThreeTypes.Group | undefined
let texture: ThreeTypes.CanvasTexture | undefined
let ro: ResizeObserver | undefined

let raf = 0
let last = 0
let spin = 0

let disposed = false
let initialized = false
let initializing = false
let initializationStarted = false
let initializationFailed = false
let contextLost = false

const pointer = { x: 0, y: 0 }
const smooth = { x: 0, y: 0 }

function getThree(): ThreeModule {
  if (!THREE) {
    throw new Error('Three.js ainda não foi carregado.')
  }

  return THREE
}

function createDotTexture(): ThreeTypes.CanvasTexture {
  const three = getThree()

  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64

  const ctx = canvas.getContext('2d')

  if (ctx) {
    ctx.beginPath()
    ctx.arc(32, 32, 30, 0, Math.PI * 2)
    ctx.fillStyle = '#ffffff'
    ctx.fill()
  }

  return new three.CanvasTexture(canvas)
}

function createRing(rotX: number, rotY: number): ThreeTypes.LineLoop {
  const three = getThree()
  const points: ThreeTypes.Vector3[] = []

  for (let i = 0; i < 128; i++) {
    const angle = (i / 128) * Math.PI * 2

    points.push(
      new three.Vector3(Math.cos(angle) * RADIUS, Math.sin(angle) * RADIUS, 0),
    )
  }

  const ring = new three.LineLoop(
    new three.BufferGeometry().setFromPoints(points),
    new three.LineBasicMaterial({
      color: CREAM,
      transparent: true,
      opacity: 0.14,
    }),
  )

  ring.rotation.set(rotX, rotY, 0)

  return ring
}

function cameraDistance(width: number, height: number): number {
  return width / height < 1 ? 7 : 5
}

function updatePixelRatio() {
  if (!renderer) return

  const isMobile = window.matchMedia('(max-width: 768px)').matches

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2),
  )
}

function init(el: HTMLElement): boolean {
  const three = getThree()

  const width = el.clientWidth
  const height = el.clientHeight

  if (width <= 0 || height <= 0) {
    return false
  }

  scene = new three.Scene()

  camera = new three.PerspectiveCamera(40, width / height, 0.1, 100)

  camera.position.z = cameraDistance(width, height)

  try {
    renderer = new three.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
  } catch {
    scene = undefined
    camera = undefined
    return false
  }

  updatePixelRatio()
  renderer.setSize(width, height)

  renderer.domElement.style.display = 'block'
  renderer.domElement.style.width = '100%'
  renderer.domElement.style.height = '100%'

  el.appendChild(renderer.domElement)

  group = new three.Group()
  group.rotation.x = 0.35

  scene.add(group)

  const positions = new Float32Array(COUNT * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))

  for (let i = 0; i < COUNT; i++) {
    const y = 1 - ((i + 0.5) / COUNT) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i

    positions[i * 3] = Math.cos(theta) * r * RADIUS
    positions[i * 3 + 1] = y * RADIUS
    positions[i * 3 + 2] = Math.sin(theta) * r * RADIUS
  }

  const geometry = new three.BufferGeometry()

  geometry.setAttribute('position', new three.BufferAttribute(positions, 3))

  texture = createDotTexture()

  const points = new three.Points(
    geometry,
    new three.PointsMaterial({
      color: CREAM,
      size: 0.045,
      map: texture,
      transparent: true,
      opacity: 0.85,
      alphaTest: 0.1,
      depthWrite: false,
    }),
  )

  group.add(points)

  group.add(
    createRing(0, 0),
    createRing(Math.PI / 2, 0),
    createRing(0, Math.PI / 2),
  )

  const accent = new three.Mesh(
    new three.SphereGeometry(0.04, 16, 16),
    new three.MeshBasicMaterial({
      color: GREEN,
    }),
  )

  accent.position
    .set(0.6, 0.5, 0.62)
    .normalize()
    .multiplyScalar(RADIUS * 1.3)

  group.add(accent)

  renderer.render(scene, camera)

  return true
}

function tick(now: number) {
  raf = 0

  if (
    disposed ||
    contextLost ||
    !renderer ||
    !scene ||
    !camera ||
    !group ||
    document.hidden
  ) {
    return
  }

  const dt = Math.min((now - last) / 1000, 0.05)
  last = now

  spin += dt * 0.35

  smooth.x += (pointer.x - smooth.x) * 0.05
  smooth.y += (pointer.y - smooth.y) * 0.05

  group.rotation.y = spin + smooth.x * 0.35
  group.rotation.x = 0.35 + smooth.y * 0.2

  renderer.render(scene, camera)

  raf = requestAnimationFrame(tick)
}

function startAnimation() {
  if (
    disposed ||
    contextLost ||
    raf ||
    !renderer ||
    !scene ||
    !camera ||
    !group ||
    document.hidden
  ) {
    return
  }

  last = performance.now()
  raf = requestAnimationFrame(tick)
}

function stopAnimation() {
  if (raf) {
    cancelAnimationFrame(raf)
    raf = 0
  }
}

function onPointerMove(event: PointerEvent) {
  if (event.pointerType === 'touch') return

  const el = container.value
  if (!el) return

  const rect = el.getBoundingClientRect()

  if (rect.width <= 0 || rect.height <= 0) return

  pointer.x = Math.max(
    -1,
    Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2),
  )

  pointer.y = Math.max(
    -1,
    Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2),
  )
}

function onPointerLeave() {
  pointer.x = 0
  pointer.y = 0
}

function onResize() {
  if (disposed) return

  const el = container.value

  if (!el) return

  if (!initialized) {
    if (initializationStarted && !initializationFailed) {
      void initializeWhenReady()
    }

    return
  }

  if (!renderer || !camera || !scene) return

  const width = el.clientWidth
  const height = el.clientHeight

  if (width <= 0 || height <= 0) return

  camera.aspect = width / height
  camera.position.z = cameraDistance(width, height)
  camera.updateProjectionMatrix()

  updatePixelRatio()
  renderer.setSize(width, height)

  if (!contextLost) {
    renderer.render(scene, camera)
  }
}

function onContextLost(event: Event) {
  event.preventDefault()

  contextLost = true

  stopAnimation()
}

function onContextRestored() {
  if (disposed || !renderer || !scene || !camera) {
    return
  }

  contextLost = false

  renderer.render(scene, camera)

  startAnimation()
}

function onVisibilityChange() {
  if (document.hidden) {
    stopAnimation()
  } else {
    startAnimation()
  }
}

async function initializeWhenReady() {
  if (disposed || initialized || initializing || initializationFailed) {
    return
  }

  initializing = true
  initializationStarted = true

  try {
    await nextTick()

    if (disposed) return

    const el = container.value

    if (!el) return

    if (el.clientWidth <= 0 || el.clientHeight <= 0) {
      return
    }

    if (!THREE) {
      THREE = await import('three')
    }

    if (disposed) return

    const success = init(el)

    if (!success) {
      initializationFailed = true
      return
    }

    initialized = true

    el.addEventListener('pointermove', onPointerMove, { passive: true })

    el.addEventListener('pointerleave', onPointerLeave)

    renderer?.domElement.addEventListener('webglcontextlost', onContextLost)

    renderer?.domElement.addEventListener(
      'webglcontextrestored',
      onContextRestored,
    )

    document.addEventListener('visibilitychange', onVisibilityChange)

    startAnimation()
  } catch {
    initializationFailed = true
  } finally {
    initializing = false
  }
}

onMounted(() => {
  if (container.value) {
    ro = new ResizeObserver(onResize)
    ro.observe(container.value)
  }

  if (typeof window.requestIdleCallback === 'function') {
    idleCallback = window.requestIdleCallback(
      () => {
        idleCallback = undefined
        void initializeWhenReady()
      },
      { timeout: 1500 },
    )
  } else {
    idleTimeout = window.setTimeout(() => {
      idleTimeout = undefined
      void initializeWhenReady()
    }, 100)
  }
})

onBeforeUnmount(() => {
  disposed = true

  if (idleCallback !== undefined) {
    window.cancelIdleCallback(idleCallback)
    idleCallback = undefined
  }

  if (idleTimeout !== undefined) {
    window.clearTimeout(idleTimeout)
    idleTimeout = undefined
  }

  stopAnimation()

  const el = container.value

  el?.removeEventListener('pointermove', onPointerMove)

  el?.removeEventListener('pointerleave', onPointerLeave)

  document.removeEventListener('visibilitychange', onVisibilityChange)

  renderer?.domElement.removeEventListener('webglcontextlost', onContextLost)

  renderer?.domElement.removeEventListener(
    'webglcontextrestored',
    onContextRestored,
  )

  ro?.disconnect()
  ro = undefined

  scene?.traverse((object) => {
    if (
      object.type === 'Mesh' ||
      object.type === 'Points' ||
      object.type === 'LineLoop'
    ) {
      const renderable = object as
        ThreeTypes.Mesh | ThreeTypes.Points | ThreeTypes.LineLoop

      renderable.geometry.dispose()

      const materials = Array.isArray(renderable.material)
        ? renderable.material
        : [renderable.material]

      materials.forEach((material) => {
        material.dispose()
      })
    }
  })

  texture?.dispose()

  renderer?.dispose()
  renderer?.domElement.remove()

  scene = undefined
  camera = undefined
  group = undefined
  renderer = undefined
  texture = undefined
  THREE = undefined

  initialized = false
  initializing = false
})
</script>

<template>
  <div
    ref="container"
    class="h-full w-full [&>canvas]:block"
    aria-hidden="true"
  ></div>
</template>
