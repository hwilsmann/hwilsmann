<script setup lang="ts">
import About from '~/components/sections/About.vue'
import Experience from '~/components/sections/Experience.vue'
import Competence from '~/components/sections/Competence.vue'
import Contact from '~/components/sections/Contact.vue'
import Hero from '~/components/sections/Hero.vue'

useSeo()
</script>

<template>
  <div>
    <Hero />
    <About />
    <Experience />
    <Competence />
    <Contact />
  </div>
</template>
