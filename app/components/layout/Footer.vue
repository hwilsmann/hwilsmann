<script setup lang="ts">
const { translate } = useLocale()
</script>

<template>
  <footer id="footer" class="py-10 md:py-12">
    <div
      class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 text-center md:flex-row md:gap-8 md:px-8 md:text-left lg:gap-12 lg:px-0"
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
        href="#header"
      >
        {{ translate('footer.anchor') }} <Arrow />
      </a>
    </div>
  </footer>
</template>
