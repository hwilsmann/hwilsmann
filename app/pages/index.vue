<script setup lang="ts">
import About from '~/components/sections/About.vue'
import Experience from '~/components/sections/Experience.vue'
import WorkTogether from '~/components/sections/WorkTogether.vue'
import Spotify from '~/components/sections/Spotify.vue'
import Contact from '~/components/sections/Contact.vue'

useSeo()
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
