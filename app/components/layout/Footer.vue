<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-gray border-t pt-5">
    <div class="text-gray flex justify-between gap-5">
      <span class="text-sm">© {{ currentYear }} hwilsmann</span>

      <span class="inline-flex items-center gap-2 text-sm">
        <span class="status-dot" aria-hidden="true"></span>

        Disponível para novos projetos
      </span>
    </div>
  </footer>
</template>
