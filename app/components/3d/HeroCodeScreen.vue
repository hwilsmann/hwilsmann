<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'

import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Group,
  Mesh,
  PlaneGeometry,
  MeshBasicMaterial,
  CanvasTexture,
  SRGBColorSpace,
  NoColorSpace,
  DoubleSide,
} from 'three'

const { locale, translate, translateArray } = useLocale()

const props = withDefaults(
  defineProps<{
    respectReducedMotion?: boolean
  }>(),
  {
    respectReducedMotion: false,
  },
)

const host = ref<HTMLDivElement | null>(null)

const COLORS = {
  primary: '#00ab8a',
  primaryHover: '#00c9a2',
  black: '#000000',
  white: '#ffffff',
  gray: '#ede9df',
  darkGray: '#292425',
  darkenGray: '#161515',
} as const

const TOKEN_COLORS = {
  keyword: COLORS.primary,
  string: COLORS.primaryHover,
  property: COLORS.gray,
  text: COLORS.gray,
  comment: 'rgba(237,233,223,0.45)',
  function: COLORS.primary,
} as const

type Token = [string, keyof typeof TOKEN_COLORS]
type Line = Token[]

const CONFIG = {
  canvasWidth: 1024,
  canvasHeight: 820,
  panelWidth: 5.2,
  panelHeight: 3.56,
  typingSpeed: 24,
  cursorInterval: 450,
  cameraPosition: 7.5,
  lineHeight: 46,
  initialLineY: 150,
  initialTextX: 100,
}

function createLines(): Line[] {
  const stack = translateArray('screen.stack')
  const actions = translateArray('screen.actions')

  const firstAction = actions[0] ?? 'criar'
  const secondAction = actions[1] ?? 'transformar'

  return [
    [[translate('screen.comment'), 'comment']],
    [
      ['const ', 'keyword'],
      ['hwilsmann ', 'text'],
      ['= {', 'property'],
    ],
    [
      [`  ${translate('screen.specialtyLabel')}:`, 'text'],
      [`'${translate('screen.specialty')}'`, 'string'],
      [',', 'property'],
    ],
    [
      [`  ${translate('screen.stackLabel')}: [`, 'text'],
      ...stack.flatMap((item, index) => [
        [`'${item}'`, 'string'] as Token,
        [index < stack.length - 1 ? ', ' : '],', 'property'] as Token,
      ]),
    ],
    [
      [`  ${translate('screen.languageLabel')}: `, 'text'],
      [`'${translate('screen.language')}'`, 'string'],
      [',', 'property'],
    ],
    [
      [`  ${translate('screen.architectureLabel')}: `, 'text'],
      [`'${translate('screen.architecture')}'`, 'string'],
      [',', 'property'],
    ],
    [
      [`  ${translate('screen.qualityLabel')}: `, 'text'],
      [`'${translate('screen.quality')}'`, 'string'],
      [',', 'property'],
    ],
    [
      [`  ${translate('screen.experienceLabel')}: `, 'text'],
      [`'${translate('screen.experience')}'`, 'string'],
      [',', 'property'],
    ],
    [
      [`  ${translate('screen.performanceLabel')}: `, 'text'],
      [`'${translate('screen.performance')}'`, 'string'],
      [',', 'property'],
    ],
    [['}', 'property']],
    [['', 'text']],
    [
      ['hwilsmann.', 'text'],
      [firstAction, 'function'],
      ['();', 'property'],
    ],
    [
      ['hwilsmann.', 'text'],
      [secondAction, 'function'],
      ['();', 'property'],
    ],
  ]
}

let LINES: Line[] = createLines()

const TOTAL_CHARACTERS = () =>
  LINES.reduce(
    (total, line) =>
      total + line.reduce((sum, token) => sum + token[0].length, 0) + 1,
    0,
  )

let raf = 0
let cleanup: (() => void) | null = null
let disposed = false

function createCanvas(width: number, height: number) {
  const canvas = document.createElement('canvas')

  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Não foi possível criar o contexto 2D.')
  }

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace

  return { canvas, context, texture }
}

function drawRoundedRectangle(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath()
  context.moveTo(x + radius, y)
  context.arcTo(x + width, y, x + width, y + height, radius)
  context.arcTo(x + width, y + height, x, y + height, radius)
  context.arcTo(x, y + height, x, y, radius)
  context.arcTo(x, y, x + width, y, radius)
  context.closePath()
}

function drawWindowHeader(context: CanvasRenderingContext2D, width: number) {
  const buttons = ['#ff5f57', '#febc2e', '#28c840']

  buttons.forEach((color, index) => {
    context.fillStyle = color
    context.beginPath()
    context.arc(48 + index * 30, 52, 9, 0, Math.PI * 2)
    context.fill()
  })

  context.font = '1.5rem Ubuntu, system-ui, sans-serif'
  context.fillStyle = COLORS.gray
  context.fillText('hw.ts', 160, 60)

  context.strokeStyle = COLORS.darkGray
  context.lineWidth = 1
  context.beginPath()
  context.moveTo(6, 92)
  context.lineTo(width - 6, 92)
  context.stroke()
}

function drawCode(
  context: CanvasRenderingContext2D,
  visibleCharacters: number,
  cursorVisible: boolean,
) {
  let lineStart = 0
  let cursorX = CONFIG.initialTextX
  let cursorY = CONFIG.initialLineY
  let cursorFound = false

  context.font = '1.5rem Ubuntu, system-ui, sans-serif'

  LINES.forEach((line, index) => {
    const y = CONFIG.initialLineY + index * CONFIG.lineHeight

    context.fillStyle = COLORS.gray
    context.globalAlpha = 0.4
    context.fillText(String(index + 1).padStart(2, ' '), 40, y)
    context.globalAlpha = 1

    const lineLength = line.reduce((sum, token) => sum + token[0].length, 0)

    const visibleInLine = Math.max(
      0,
      Math.min(lineLength, visibleCharacters - lineStart),
    )

    let consumed = 0
    let x = CONFIG.initialTextX

    for (const [text, color] of line) {
      const available = Math.max(0, visibleInLine - consumed)
      const part = text.slice(0, Math.min(text.length, available))

      context.fillStyle = TOKEN_COLORS[color]
      context.fillText(part, x, y)

      x += context.measureText(part).width
      consumed += text.length

      if (consumed >= visibleInLine) break
    }

    if (
      !cursorFound &&
      visibleCharacters >= lineStart &&
      visibleCharacters <= lineStart + lineLength
    ) {
      cursorX = x
      cursorY = y
      cursorFound = true
    }

    lineStart += lineLength + 1
  })

  if (cursorVisible) {
    context.fillStyle = COLORS.primary
    context.fillRect(cursorX + 2, cursorY - 26, 14, 32)
  }
}

function drawMainCanvas(
  canvasData: ReturnType<typeof createCanvas>,
  characters: number,
  cursorVisible: boolean,
) {
  const { canvas, context } = canvasData
  const visibleCharacters = Math.max(
    0,
    Math.min(characters, TOTAL_CHARACTERS()),
  )

  context.clearRect(0, 0, canvas.width, canvas.height)

  drawRoundedRectangle(context, 6, 6, canvas.width - 12, canvas.height - 12, 28)

  context.fillStyle = COLORS.darkenGray
  context.fill()

  context.strokeStyle = COLORS.primary
  context.lineWidth = 2
  context.stroke()

  drawWindowHeader(context, canvas.width)
  drawCode(context, visibleCharacters, cursorVisible)

  canvasData.texture.needsUpdate = true
}

function createReflection() {
  const fade = createCanvas(8, 256)
  const gradient = fade.context.createLinearGradient(0, 0, 0, 256)

  gradient.addColorStop(0, '#000')
  gradient.addColorStop(1, '#aaa')

  fade.context.fillStyle = gradient
  fade.context.fillRect(0, 0, 8, 256)
  fade.texture.colorSpace = NoColorSpace
  fade.texture.needsUpdate = true

  return fade
}

function createScene(mainTexture: CanvasTexture, fadeTexture: CanvasTexture) {
  const scene = new Scene()
  const group = new Group()
  const geometry = new PlaneGeometry(CONFIG.panelWidth, CONFIG.panelHeight)

  const panelMaterial = new MeshBasicMaterial({
    map: mainTexture,
    transparent: true,
  })

  const reflectionMaterial = new MeshBasicMaterial({
    map: mainTexture,
    alphaMap: fadeTexture,
    transparent: true,
    opacity: 0.45,
    side: DoubleSide,
    depthWrite: false,
  })

  const panel = new Mesh(geometry, panelMaterial)
  const reflection = new Mesh(geometry, reflectionMaterial)

  reflection.scale.y = -0.45
  reflection.position.y = -2.55

  group.add(panel, reflection)

  const isMobile = window.matchMedia('(max-width: 767px)').matches

  if (isMobile) {
    group.rotation.set(0, 0, 0)
  } else {
    group.rotation.set(-0.18, -0.32, 0)
  }

  scene.add(group)

  return {
    scene,
    geometry,
    panelMaterial,
    reflectionMaterial,
  }
}

function createCamera() {
  const camera = new PerspectiveCamera(40, 1, 0.1, 50)
  camera.position.z = CONFIG.cameraPosition

  return camera
}

onMounted(async () => {
  const hostElement = host.value

  if (!hostElement) return

  const el: HTMLDivElement = hostElement

  try {
    await document.fonts.load('30px Ubuntu')
  } catch {
    //
  }

  if (disposed || !el.isConnected) return

  let renderer: WebGLRenderer

  try {
    renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'low-power',
    })
  } catch {
    return
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.domElement.setAttribute('aria-hidden', 'true')
  el.appendChild(renderer.domElement)

  const main = createCanvas(CONFIG.canvasWidth, CONFIG.canvasHeight)
  const fade = createReflection()

  const { scene, geometry, panelMaterial, reflectionMaterial } = createScene(
    main.texture,
    fade.texture,
  )

  const camera = createCamera()

  let typed = 0
  let lastTime = 0
  let lastDrawn = -1
  let lastCursorState = false
  let visible = true

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

  let reducedMotion = props.respectReducedMotion && motionQuery.matches

  function render() {
    renderer.render(scene, camera)
  }

  function updateCanvas(characters: number, cursorVisible: boolean) {
    drawMainCanvas(main, characters, cursorVisible)

    lastDrawn = characters
    lastCursorState = cursorVisible
  }

  function resize() {
    const width = el.clientWidth
    const height = el.clientHeight

    if (width <= 0 || height <= 0) return

    renderer.setSize(width, height, false)

    camera.aspect = width / height
    camera.updateProjectionMatrix()

    if (reducedMotion) {
      updateCanvas(TOTAL_CHARACTERS(), true)
      render()
    }
  }

  function loop(time: number) {
    raf = requestAnimationFrame(loop)

    if (!visible || reducedMotion) {
      lastTime = time
      return
    }

    const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0

    lastTime = time
    typed += CONFIG.typingSpeed * delta

    if (typed > TOTAL_CHARACTERS() + 60) {
      typed = 0
    }

    const characters = Math.floor(typed)
    const cursorVisible = Math.floor(time / CONFIG.cursorInterval) % 2 === 1

    if (characters !== lastDrawn || cursorVisible !== lastCursorState) {
      updateCanvas(characters, cursorVisible)
    }

    render()
  }

  function startAnimation() {
    cancelAnimationFrame(raf)
    lastTime = 0
    raf = requestAnimationFrame(loop)
  }

  function onMotionChange(event: MediaQueryListEvent) {
    if (!props.respectReducedMotion) return

    reducedMotion = event.matches

    if (reducedMotion) {
      cancelAnimationFrame(raf)
      typed = TOTAL_CHARACTERS()
      updateCanvas(TOTAL_CHARACTERS(), true)
      render()
    } else {
      startAnimation()
    }
  }

  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(el)

  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true
    lastTime = 0
  })

  intersectionObserver.observe(el)

  resize()

  if (props.respectReducedMotion) {
    motionQuery.addEventListener('change', onMotionChange)
  }

  if (reducedMotion) {
    updateCanvas(TOTAL_CHARACTERS(), true)
    render()
  } else {
    startAnimation()
  }

  const stopLocaleWatch = watch(locale, () => {
    LINES = createLines()
    typed = 0
    lastTime = 0
    lastDrawn = -1

    if (reducedMotion) {
      typed = TOTAL_CHARACTERS()
      updateCanvas(TOTAL_CHARACTERS(), true)
    } else {
      updateCanvas(0, true)
    }

    render()
  })

  cleanup = () => {
    stopLocaleWatch()

    cancelAnimationFrame(raf)

    resizeObserver.disconnect()
    intersectionObserver.disconnect()

    if (props.respectReducedMotion) {
      motionQuery.removeEventListener('change', onMotionChange)
    }

    geometry.dispose()
    panelMaterial.dispose()
    reflectionMaterial.dispose()

    main.texture.dispose()
    fade.texture.dispose()

    renderer.dispose()
    renderer.forceContextLoss()
    renderer.domElement.remove()
  }
})

onBeforeUnmount(() => {
  disposed = true
  cleanup?.()
  cleanup = null
})
</script>

<template>
  <div
    ref="host"
    class="h-full min-h-0 w-full [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full"
    aria-hidden="true"
  ></div>
</template>
