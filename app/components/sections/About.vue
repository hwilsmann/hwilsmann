<script setup lang="ts">
const { translate } = useLocale()
</script>

<template>
  <section id="about" class="bg-gray text-dark-gray py-20 md:py-28 lg:py-36">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-10 px-5 md:gap-12 md:px-8 lg:px-0"
    >
      <div class="flex flex-col gap-4">
        <span class="text-dark-gray">{{ translate('about.label') }}</span>

        <div
          class="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-8 lg:gap-12"
        >
          <div class="flex flex-col items-start gap-6 md:gap-4">
            <h2
              class="text-5xl font-medium tracking-tighter sm:text-6xl lg:text-7xl"
            >
              {{ translate('about.title.first') }}

              <em class="text-primary">{{ translate('about.title.second') }}</em
              >.
            </h2>

            <div class="flex flex-col items-start gap-1">
              <em class="text-2xl font-medium tracking-tighter">
                Henrique Wilsmann
              </em>

              <span class="text-dark-gray">
                {{ translate('about.location') }}
              </span>
            </div>
          </div>

          <div class="flex flex-col items-start gap-4">
            <p class="text-dark-gray/75 leading-6">
              {{ translate('about.description.first') }}
            </p>

            <p class="text-dark-gray/75 leading-6">
              {{ translate('about.description.second') }}
            </p>

            <div class="flex flex-wrap gap-x-4 gap-y-2">
              <a
                class="text-dark-gray border-b"
                href="https://www.linkedin.com/in/hwilsmann/"
              >
                {{ translate('about.anchor.linkedin') }} 🡥
              </a>

              <a
                class="text-dark-gray border-b"
                href="https://github.com/hwilsmann"
              >
                {{ translate('about.anchor.github') }} 🡥
              </a>

              <a
                class="text-dark-gray border-b"
                href="mailto:hwilsmann83@gmail.com"
              >
                {{ translate('about.anchor.email') }} 🡥
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        class="border-dark-gray/10 grid grid-cols-1 gap-8 border-y py-8 sm:grid-cols-2 md:gap-6 md:py-10 lg:grid-cols-3 lg:gap-4 lg:py-12"
      >
        <div class="flex flex-col gap-4">
          <h3 class="text-xl font-medium tracking-tighter">
            {{ translate('about.principles.0.title') }}
          </h3>

          <p class="text-dark-gray/75 leading-6">
            {{ translate('about.principles.0.description') }}
          </p>
        </div>

        <div class="flex flex-col gap-4">
          <h3 class="text-xl font-medium tracking-tighter">
            {{ translate('about.principles.1.title') }}
          </h3>

          <p class="text-dark-gray/75 leading-6">
            {{ translate('about.principles.1.description') }}
          </p>
        </div>

        <div class="flex flex-col gap-4">
          <h3 class="text-xl font-medium tracking-tighter">
            {{ translate('about.principles.2.title') }}
          </h3>

          <p class="text-dark-gray/75 leading-6">
            {{ translate('about.principles.2.description') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
