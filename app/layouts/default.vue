<script setup lang="ts">
import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'

const error = useError()
</script>

<template>
  <div>
    <Header :error-page="Boolean(error)" />

    <main>
      <slot />
    </main>

    <Footer />
  </div>
</template>
