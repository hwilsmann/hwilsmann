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
          class="grid grid-cols-2 items-center gap-5 md:grid-cols-2 md:items-start md:gap-8 lg:gap-12"
        >
          <div
            class="contents md:flex md:flex-col md:items-start md:gap-8 lg:gap-12"
          >
            <h2
              class="col-span-2 text-5xl font-medium tracking-tighter sm:text-6xl md:col-span-1 lg:text-7xl"
            >
              {{ translate('hero.title') }}
              <em class="text-primary">{{ translate('hero.emphasis') }}</em
              >.
            </h2>

            <div
              class="border-gray/10 col-span-1 flex flex-col items-start gap-4 border-t pt-5 md:pt-8 lg:pt-12"
            >
              <p class="text-gray/75 leading-6">
                {{ translate('hero.description') }}
              </p>

              <a
                class="text-gray/50 flex items-center gap-1 border-b focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                href="#about"
              >
                {{ translate('hero.anchor') }} <Arrow />
              </a>
            </div>
          </div>

          <div class="col-span-1 flex flex-col items-start gap-4 md:col-span-1">
            <div
              class="relative h-56 w-full overflow-hidden sm:h-64 md:h-96 md:h-105 lg:h-125"
            >
              <LazySphere />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
