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

const props = withDefaults(defineProps<{ respectReducedMotion?: boolean }>(), {
  respectReducedMotion: false,
})

const host = ref<HTMLDivElement | null>(null)

const COLORS = {
  primary: '#00ab8a',
  hover: '#00c9a2',
  white: '#ffffff',
  gray: '#ede9df',
  dark: '#161515',
  border: '#292425',
} as const

const TOKEN_COLORS = {
  keyword: COLORS.primary,
  string: COLORS.hover,
  property: COLORS.gray,
  text: COLORS.gray,
  comment: 'rgba(237,233,223,0.45)',
  function: COLORS.primary,
} as const

type Token = [string, keyof typeof TOKEN_COLORS]
type Line = Token[]

const CONFIG = {
  width: 1024,
  height: 820,
  panelWidth: 5.2,
  panelHeight: 3.56,
  typingSpeed: 24,
  cursorInterval: 450,
  lineHeight: 50,
  textX: 100,
  lineY: 150,
}

function createLines(): Line[] {
  const stack = translateArray('screen.stack')
  const actions = translateArray('screen.actions')

  return [
    [[translate('screen.comment'), 'comment']],
    [
      ['const ', 'keyword'],
      ['hwilsmann ', 'text'],
      ['= {', 'property'],
    ],
    [
      [`  ${translate('screen.specialtyLabel')}: `, 'text'],
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
    ...(
      [
        'language',
        'architecture',
        'quality',
        'experience',
        'performance',
      ] as const
    ).map(
      (key) =>
        [
          [`  ${translate(`screen.${key}Label`)}: `, 'text'],
          [`'${translate(`screen.${key}`)}'`, 'string'],
          [',', 'property'],
        ] as Line,
    ),
    [['}', 'property']],
    [['', 'text']],
    ...actions.slice(0, 2).map(
      (action) =>
        [
          ['hwilsmann.', 'text'],
          [action, 'function'],
          ['();', 'property'],
        ] as Line,
    ),
  ]
}

function createCanvas(width: number, height: number) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error()
  }

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace

  return { canvas, context, texture }
}

function drawCode(
  context: CanvasRenderingContext2D,
  lines: Line[],
  visibleCharacters: number,
  cursorVisible: boolean,
) {
  let offset = 0
  let cursorX = CONFIG.textX
  let cursorY = CONFIG.lineY
  let cursorFound = false

  context.font = `${window.innerWidth < 768 ? 36 : 30}px Ubuntu, system-ui, sans-serif`

  lines.forEach((line, index) => {
    const y = CONFIG.lineY + index * CONFIG.lineHeight
    const length = line.reduce((sum, token) => sum + token[0].length, 0)
    const visible = Math.max(0, Math.min(length, visibleCharacters - offset))

    context.fillStyle = COLORS.gray
    context.globalAlpha = 0.4
    context.fillText(String(index + 1).padStart(2, ' '), 40, y)
    context.globalAlpha = 1

    let x = CONFIG.textX
    let consumed = 0

    for (const [text, color] of line) {
      const part = text.slice(
        0,
        Math.max(0, Math.min(text.length, visible - consumed)),
      )

      context.fillStyle = TOKEN_COLORS[color]
      context.fillText(part, x, y)
      x += context.measureText(part).width
      consumed += text.length

      if (consumed >= visible) break
    }

    if (
      !cursorFound &&
      visibleCharacters >= offset &&
      visibleCharacters <= offset + length
    ) {
      cursorX = x
      cursorY = y
      cursorFound = true
    }

    offset += length + 1
  })

  if (cursorVisible) {
    context.fillStyle = COLORS.primary
    context.fillRect(cursorX + 2, cursorY - 26, 14, 32)
  }
}

function drawPanel(
  data: ReturnType<typeof createCanvas>,
  lines: Line[],
  characters: number,
  cursor: boolean,
) {
  const { canvas, context, texture } = data

  context.clearRect(0, 0, canvas.width, canvas.height)

  context.beginPath()
  context.rect(6, 6, canvas.width - 12, canvas.height - 12)
  context.fillStyle = COLORS.dark
  context.fill()
  context.strokeStyle = COLORS.primary
  context.lineWidth = 2
  context.stroke()

  ;['#ff5f57', '#febc2e', '#28c840'].forEach((color, index) => {
    context.beginPath()
    context.arc(48 + index * 30, 52, 9, 0, Math.PI * 2)
    context.fillStyle = color
    context.fill()
  })

  context.font = '30px Ubuntu, system-ui, sans-serif'
  context.fillStyle = COLORS.gray
  context.fillText('hw.ts', 160, 60)

  context.strokeStyle = COLORS.border
  context.beginPath()
  context.moveTo(6, 92)
  context.lineTo(canvas.width - 6, 92)
  context.stroke()

  drawCode(context, lines, characters, cursor)
  texture.needsUpdate = true
}

onMounted(async () => {
  const el = host.value
  if (!el) return

  try {
    await document.fonts.load('30px Ubuntu')
  } catch {
    //
  }

  if (!el.isConnected) return

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

  const lines = ref(createLines())
  const totalCharacters = () =>
    lines.value.reduce(
      (sum, line) =>
        sum + line.reduce((n, token) => n + token[0].length, 0) + 1,
      0,
    )

  const main = createCanvas(CONFIG.width, CONFIG.height)
  const fade = createCanvas(8, 256)

  const gradient = fade.context.createLinearGradient(0, 0, 0, 256)
  gradient.addColorStop(0, '#000')
  gradient.addColorStop(1, '#aaa')
  fade.context.fillStyle = gradient
  fade.context.fillRect(0, 0, 8, 256)
  fade.texture.colorSpace = NoColorSpace

  const scene = new Scene()
  const group = new Group()
  const geometry = new PlaneGeometry(CONFIG.panelWidth, CONFIG.panelHeight)

  const material = new MeshBasicMaterial({
    map: main.texture,
    transparent: true,
  })

  const reflectionMaterial = new MeshBasicMaterial({
    map: main.texture,
    alphaMap: fade.texture,
    transparent: true,
    opacity: 0.45,
    side: DoubleSide,
    depthWrite: false,
  })

  group.add(new Mesh(geometry, material))

  const reflection = new Mesh(geometry, reflectionMaterial)
  reflection.scale.y = -0.45
  reflection.position.y = -2.55
  group.add(reflection)

  if (window.innerWidth >= 768) {
    group.rotation.set(-0.18, -0.32, 0)
  }

  scene.add(group)

  const camera = new PerspectiveCamera(40, 1, 0.1, 50)
  camera.position.z = 7.5

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.domElement.setAttribute('aria-hidden', 'true')
  el.appendChild(renderer.domElement)

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  let reducedMotion = props.respectReducedMotion && motionQuery.matches
  let visible = true
  let typed = 0
  let lastTime = 0
  let raf = 0
  let lastDrawn = -1
  let lastCursor = false

  const render = () => renderer.render(scene, camera)

  const update = (characters: number, cursor: boolean) => {
    drawPanel(main, lines.value, characters, cursor)
    lastDrawn = characters
    lastCursor = cursor
  }

  const resize = () => {
    const width = el.clientWidth
    const height = el.clientHeight
    if (!width || !height) return

    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    if (reducedMotion) {
      update(totalCharacters(), true)
      render()
    }
  }

  const loop = (time: number) => {
    raf = requestAnimationFrame(loop)

    if (!visible || reducedMotion) {
      lastTime = time
      return
    }

    const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0
    lastTime = time
    typed = (typed + CONFIG.typingSpeed * delta) % (totalCharacters() + 60)

    const characters = Math.floor(typed)
    const cursor = Math.floor(time / CONFIG.cursorInterval) % 2 === 1

    if (characters !== lastDrawn || cursor !== lastCursor) {
      update(characters, cursor)
      render()
    }
  }

  const start = () => {
    cancelAnimationFrame(raf)
    lastTime = 0
    raf = requestAnimationFrame(loop)
  }

  const onMotionChange = (event: MediaQueryListEvent) => {
    reducedMotion = event.matches
    if (reducedMotion) {
      cancelAnimationFrame(raf)
      typed = totalCharacters()
      update(typed, true)
      render()
    } else {
      start()
    }
  }

  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(el)

  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true
    lastTime = 0
  })
  intersectionObserver.observe(el)

  if (props.respectReducedMotion) {
    motionQuery.addEventListener('change', onMotionChange)
  }

  resize()

  if (reducedMotion) {
    update(totalCharacters(), true)
    render()
  } else {
    start()
  }

  const stopWatch = watch(locale, () => {
    lines.value = createLines()
    typed = 0
    lastDrawn = -1
    update(reducedMotion ? totalCharacters() : 0, true)
    render()
  })

  onBeforeUnmount(() => {
    stopWatch()
    cancelAnimationFrame(raf)
    resizeObserver.disconnect()
    intersectionObserver.disconnect()
    motionQuery.removeEventListener('change', onMotionChange)

    geometry.dispose()
    material.dispose()
    reflectionMaterial.dispose()
    main.texture.dispose()
    fade.texture.dispose()

    renderer.dispose()
    renderer.forceContextLoss()
    renderer.domElement.remove()
  })
})
</script>

<template>
  <div
    ref="host"
    class="h-full min-h-0 w-full [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full"
    aria-hidden="true"
  ></div>
</template>
