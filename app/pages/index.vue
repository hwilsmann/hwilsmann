<script setup lang="ts">
import About from '~/components/sections/About.vue'
import Experience from '~/components/sections/Experience.vue'
import WorkTogether from '~/components/sections/WorkTogether.vue'
import Spotify from '~/components/sections/Spotify.vue'
import Contact from '~/components/sections/Contact.vue'

useSeoMeta({
  title: 'Henrique Wilsmann — Desenvolvedor Frontend',
  description:
    'Desenvolvedor Frontend com mais de 9 anos de experiência em Vue.js, Nuxt, TypeScript, JavaScript e interfaces digitais.',
  ogUrl: 'https://hwilsmann.vercel.app',
  ogTitle: 'Henrique Wilsmann — Desenvolvedor Frontend',
  ogDescription:
    'Desenvolvedor Frontend com mais de 9 anos de experiência em Vue.js, Nuxt, TypeScript, JavaScript e interfaces digitais.',
  ogType: 'website',
  ogLocale: 'pt_BR',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Henrique Wilsmann — Desenvolvedor Frontend',
  twitterDescription:
    'Desenvolvedor Frontend com mais de 9 anos de experiência em Vue.js, Nuxt, TypeScript, JavaScript e interfaces digitais.',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://hwilsmann.vercel.app',
    },
  ],
})

useSchemaOrg([
  {
    '@type': 'Person',
    name: 'Henrique Wilsmann',
    url: 'https://hwilsmann.vercel.app',
    jobTitle: 'Desenvolvedor Frontend',
    sameAs: [
      'https://www.linkedin.com/in/hwilsmann/',
      'https://github.com/hwilsmann',
    ],
  },
])
</script>

<template>
  <div class="flex flex-col gap-20">
    <About />
    <Experience />
    <WorkTogether />
    <Spotify />
    <Contact />
  </div>
</template>
