<script setup lang="ts">
import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'

const error = useError()
</script>

<template>
  <Header :error-page="Boolean(error)" />

  <main id="main">
    <slot />
  </main>

  <Footer />
</template>
