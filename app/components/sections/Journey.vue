<script setup lang="ts">
import en from '~/locales/en'
import pt from '~/locales/pt'

const { translate, locale } = useLocale()

type Journey = {
  period: string
  company: string
  workload: string
  location: string
  highlights: readonly string[]
}

const journeys = computed<readonly Journey[]>(() => {
  return locale.value === 'en' ? en.journey.journeys : pt.journey.journeys
})
</script>

<template>
  <section id="journey" class="py-20 md:py-28 lg:py-36">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-10 px-5 md:gap-12 md:px-8 lg:px-0"
    >
      <div class="flex flex-col gap-4">
        <span class="text-gray/50">{{ translate('journey.label') }}</span>

        <h2
          class="text-5xl font-medium tracking-tighter sm:text-6xl lg:text-7xl"
        >
          {{ translate('journey.title.first') }}

          <em class="text-primary"> {{ translate('journey.title.second') }} </em
          >.
        </h2>
      </div>

      <div class="flex flex-col gap-10 md:gap-12">
        <div
          v-for="journey in journeys"
          :key="journey.company"
          class="border-gray/10 grid grid-cols-1 items-start gap-6 border-t pt-8 md:grid-cols-[1fr_2fr] md:gap-8 md:pt-10 lg:gap-12 lg:pt-12"
        >
          <span class="text-gray/50">
            {{ journey.period }}
          </span>

          <div class="flex flex-col items-start gap-4">
            <div class="flex flex-col items-start gap-1">
              <h3 class="text-2xl font-medium tracking-tighter">
                {{ journey.company }}
              </h3>

              <div class="flex flex-col gap-1">
                <span class="text-gray/75">
                  {{ journey.workload }}
                </span>

                <span class="text-gray/75">
                  {{ journey.location }}
                </span>
              </div>
            </div>

            <ul class="flex list-inside list-disc flex-col gap-1">
              <li
                v-for="technology in journey.highlights"
                :key="technology"
                class="leading-6"
              >
                {{ technology }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
