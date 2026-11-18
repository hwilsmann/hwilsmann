import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

export default defineNuxtPlugin(() => {
  const lenis = new Lenis({
    autoRaf: false,
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 0.85,
    anchors: true,
    respectReducedMotion: false,
  })

  lenis.on('scroll', ScrollTrigger.update)

  const update = (time: number) => {
    lenis.raf(time * 1000)
  }

  gsap.ticker.add(update)
  gsap.ticker.lagSmoothing(0)

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      gsap.ticker.remove(update)
      lenis.destroy()
    })
  }

  return {
    provide: {
      lenis,
    },
  }
})
