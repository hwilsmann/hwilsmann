<script setup lang="ts">
import en from '~/locales/en'
import pt from '~/locales/pt'

const { translate, locale } = useLocale()

const competencies = computed(() =>
  locale.value === 'en' ? en.skills.competencies : pt.skills.competencies,
)
</script>

<template>
  <section id="competence" class="bg-darken-gray py-20 md:py-28 lg:py-36">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-10 px-5 md:gap-12 md:px-8 lg:px-0"
    >
      <div class="flex flex-col gap-4">
        <span class="text-gray/50">{{ translate('skills.label') }}</span>

        <div
          class="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-8 lg:gap-12"
        >
          <div class="flex flex-col items-start gap-4">
            <h2
              class="text-5xl font-medium tracking-tighter sm:text-6xl lg:text-7xl"
            >
              {{ translate('skills.title.first') }}

              <em class="text-primary">
                {{ translate('skills.title.second') }} </em
              >.
            </h2>
          </div>

          <div class="flex flex-col items-start gap-8 md:gap-10 lg:gap-12">
            <div
              v-for="competence in competencies"
              :key="competence.title"
              class="border-gray/10 flex w-full flex-col items-start gap-4 border-t pt-8 md:pt-10 lg:pt-12"
            >
              <h3 class="text-2xl font-medium tracking-tighter">
                {{ competence.title }}
              </h3>

              <ul class="flex flex-wrap gap-3 md:gap-4">
                <li
                  v-for="technology in competence.skills"
                  :key="technology"
                  class="border-gray/10 text-gray/50 rounded-full border px-4 py-2"
                >
                  {{ technology }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
