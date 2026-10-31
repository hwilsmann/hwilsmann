<script setup lang="ts">
const { translate } = useLocale()
</script>

<template>
  <section id="contact" class="bg-primary/50 py-20 md:py-28 lg:py-36">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-10 px-5 md:gap-12 md:px-8 lg:px-0"
    >
      <div class="flex flex-col gap-4">
        <span class="text-gray/50">{{ translate('contact.label') }}</span>

        <h2
          class="text-5xl font-medium tracking-tighter sm:text-6xl lg:text-7xl"
        >
          {{ translate('contact.title.first') }}

          <em class="text-primary"> {{ translate('contact.title.second') }} </em
          >.
        </h2>
      </div>

      <div
        class="border-gray/10 grid grid-cols-1 items-start gap-8 border-t pt-8 md:grid-cols-[2fr_1fr] md:gap-8 md:pt-10 lg:gap-12 lg:pt-12"
      >
        <p class="text-gray/75 leading-6">
          {{ translate('contact.description') }}
        </p>

        <div class="flex flex-col items-start gap-4">
          <a
            class="text-gray/75 flex items-center gap-1 border-b break-all"
            href="https://www.linkedin.com/in/hwilsmann/"
            target="_blank"
          >
            linkedin.com/in/hwilsmann <Arrow />
          </a>

          <a
            class="text-gray/75 flex items-center gap-1 border-b break-all"
            href="https://github.com/hwilsmann"
            target="_blank"
          >
            github.com/hwilsmann <Arrow />
          </a>

          <a
            class="text-gray/75 flex items-center gap-1 border-b break-all"
            href="mailto:hwilsmann83@gmail.com"
            target="_blank"
          >
            hwilsmann83@gmail.com <Arrow />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
