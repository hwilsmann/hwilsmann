<script setup lang="ts">
const { translate } = useLocale()
</script>

<template>
  <section id="hero" class="bg-darken-gray py-16 lg:py-36">
    <div class="mx-auto flex max-w-6xl flex-col gap-10 px-5 lg:px-0">
      <div class="flex min-w-0 flex-col gap-4">
        <span class="text-gray/50">
          {{ translate('hero.label') }}
        </span>

        <div
          class="grid min-w-0 grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:items-start lg:gap-12"
        >
          <div class="flex min-w-0 flex-col gap-8 lg:gap-12">
            <h2 class="text-4xl font-medium tracking-tighter lg:text-7xl">
              {{ translate('hero.title') }}
              <em class="text-primary"> {{ translate('hero.emphasis') }} </em>.
            </h2>

            <div
              class="border-gray/10 flex flex-col items-start gap-4 border-t pt-5 lg:pt-12"
            >
              <p class="text-gray/75 leading-6">
                {{ translate('hero.description') }}
              </p>

              <a
                href="#about"
                class="border-gray/50 text-gray/50 flex items-center gap-1 border-b"
              >
                {{ translate('hero.anchor') }}
                <Arrow />
              </a>
            </div>
          </div>

          <div class="flex min-w-0 flex-col items-start">
            <div class="relative h-80 w-full overflow-hidden lg:h-125">
              <HeroCodeScreen />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
