<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-gray border-t pt-5">
    <div
      class="text-gray flex flex-col items-center gap-5 md:flex-row md:justify-between"
    >
      <span class="text-sm">© {{ currentYear }} hwilsmann</span>

      <span class="inline-flex items-center gap-2 text-sm">
        <span class="bg-primary size-2 rounded-full" aria-hidden="true"></span>

        Disponível para novos projetos
      </span>
    </div>
  </footer>
</template>
