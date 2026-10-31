<script setup lang="ts">
const { translate } = useLocale()
</script>

<template>
  <section id="hero" class="bg-darken-gray py-20 md:py-28 lg:py-36">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-10 px-5 md:gap-12 md:px-8 lg:px-0"
    >
      <div class="flex flex-col gap-4">
        <span class="text-gray/50">{{ translate('hero.label') }}</span>

        <div
          class="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-8 lg:gap-12"
        >
          <div class="flex flex-col items-start gap-8 md:gap-10 lg:gap-12">
            <h2
              class="text-5xl font-medium tracking-tighter sm:text-6xl lg:text-7xl"
            >
              {{ translate('hero.title') }}
              <em class="text-primary">{{ translate('hero.emphasis') }}</em
              >.
            </h2>

            <div
              class="border-gray/10 flex flex-col items-start gap-4 border-t pt-8 md:pt-10 lg:pt-12"
            >
              <p class="text-gray/75 leading-6">
                {{ translate('hero.description') }}
              </p>

              <a class="text-gray/50 border-b" href="#about">
                {{ translate('hero.anchor') }} &#129125;
              </a>
            </div>
          </div>

          <div class="flex flex-col items-start gap-4">
            <div
              class="relative h-80 w-full overflow-hidden sm:h-96 md:h-105 lg:h-125"
            >
              <LazySphere />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
