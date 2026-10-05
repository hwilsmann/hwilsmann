<script setup lang="ts">
import About from '~/components/sections/About.vue'
import Experience from '~/components/sections/Experience.vue'
import WorkTogether from '~/components/sections/WorkTogether.vue'
import Spotify from '~/components/sections/Spotify.vue'
import Contact from '~/components/sections/Contact.vue'

useSeoMeta({
  title: 'Henrique Wilsmann — Desenvolvedor Frontend Vue.js, Nuxt e TypeScript',
  description:
    'Henrique Wilsmann é Desenvolvedor Frontend com mais de 9 anos de experiência em Vue.js, Nuxt, TypeScript, JavaScript e Tailwind CSS. Especialista em arquitetura frontend, interfaces escaláveis, design systems, performance, acessibilidade e integração com APIs.',
  ogUrl: 'https://hwilsmann.vercel.app',
  ogTitle:
    'Henrique Wilsmann — Desenvolvedor Frontend Vue.js, Nuxt e TypeScript',
  ogDescription:
    'Desenvolvedor Frontend com mais de 9 anos de experiência em Vue.js, Nuxt, TypeScript, JavaScript e Tailwind CSS, com foco em arquitetura frontend, design systems, performance, acessibilidade e interfaces escaláveis.',
  ogType: 'website',
  ogLocale: 'pt_BR',
  twitterCard: 'summary_large_image',
  twitterTitle:
    'Henrique Wilsmann — Desenvolvedor Frontend Vue.js, Nuxt e TypeScript',
  twitterDescription:
    'Desenvolvedor Frontend com mais de 9 anos de experiência em Vue.js, Nuxt, TypeScript, JavaScript e Tailwind CSS. Arquitetura frontend, design systems, performance e acessibilidade.',
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
    description:
      'Desenvolvedor Frontend com mais de 9 anos de experiência em Vue.js, Nuxt, TypeScript, JavaScript e Tailwind CSS, com experiência em arquitetura frontend, design systems, performance, acessibilidade e integração com APIs.',
    sameAs: [
      'https://www.linkedin.com/in/hwilsmann/',
      'https://github.com/hwilsmann',
    ],
    knowsAbout: [
      'Desenvolvimento Frontend',
      'Vue.js',
      'Nuxt',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Arquitetura Frontend',
      'Design Systems',
      'Performance Web',
      'Acessibilidade Web',
      'Integração com APIs',
      'Desenvolvimento de Interfaces Web',
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
