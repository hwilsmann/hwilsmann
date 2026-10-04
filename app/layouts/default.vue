<script setup lang="ts">
import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'
</script>

<template>
  <div
    class="mx-auto flex min-h-screen max-w-2xl flex-col gap-20 px-5 py-20 sm:px-6"
  >
    <Header />

    <main>
      <slot></slot>
    </main>

    <Footer />
  </div>
</template>
