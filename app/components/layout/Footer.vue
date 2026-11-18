<script setup lang="ts">
const { translate } = useLocale()
</script>

<template>
  <footer id="footer" class="py-10 lg:py-12">
    <div
      class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 text-center lg:flex-row lg:gap-12 lg:px-0 lg:text-left"
    >
      <em class="text-xl font-bold tracking-tighter">
        hw <span class="text-primary">.</span>
      </em>

      <small class="text-gray/50 text-[0.625rem] leading-5">
        © {{ new Date().getFullYear() }} Henrique Wilsmann &#9749;.
        {{ translate('footer.copyright') }}
      </small>

      <a
        class="text-gray/50 flex items-center gap-1 border-b text-[0.625rem]"
        href="#root"
      >
        {{ translate('footer.anchor') }} <Arrow />
      </a>
    </div>
  </footer>
</template>
