<script setup lang="ts">
const { translate } = useLocale()
</script>

<template>
  <NuxtLayout>
    <div>
      <section
        id="error"
        class="bg-gray text-dark-gray py-20 md:py-28 lg:py-36"
      >
        <div
          class="mx-auto flex max-w-3xl flex-col gap-10 px-5 md:gap-12 md:px-8 lg:px-0"
        >
          <div
            class="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-8 lg:gap-12"
          >
            <div class="flex flex-col gap-4">
              <h2 class="text-9xl font-medium tracking-tighter">
                4 <em class="text-primary">0</em>4.
              </h2>
            </div>

            <div class="flex flex-col gap-4">
              <span class="text-dark-gray">{{ translate('error.label') }}</span>

              <h3 class="text-2xl font-medium tracking-tighter">
                {{ translate('error.title') }}

                <em class="text-primary">{{ translate('error.emphasis') }}</em
                >.
              </h3>

              <p class="text-dark-gray/75 leading-6">
                {{ translate('error.description') }}
              </p>

              <div class="flex flex-wrap gap-x-4 gap-y-2">
                <NuxtLink
                  to="/"
                  class="text-dark-gray flex items-center gap-1 border-b"
                >
                  {{ translate('error.anchor.first') }} <Arrow />
                </NuxtLink>

                <a
                  class="text-dark-gray flex items-center gap-1 border-b"
                  href="https://wa.me/5551999044946"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ translate('error.anchor.second') }} <Arrow />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>
