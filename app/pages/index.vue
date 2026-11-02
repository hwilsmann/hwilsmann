<script setup lang="ts">
import Hero from '~/components/sections/Hero.vue'
import About from '~/components/sections/About.vue'
import Journey from '~/components/sections/Journey.vue'
import Technology from '~/components/sections/Technology.vue'
import Contact from '~/components/sections/Contact.vue'

useSeo()
</script>

<template>
  <div>
    <Hero />
    <About />
    <Journey />
    <Technology />
    <Contact />
  </div>
</template>
