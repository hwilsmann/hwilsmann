<script setup lang="ts">
import { ref } from 'vue'

const { locale, setLocale, translate } = useLocale()

const menuOpen = ref(false)

const closeMenu = () => {
  menuOpen.value = false
}
</script>

<template>
  <header id="header" class="py-8 md:py-12">
    <div class="mx-auto flex max-w-6xl flex-col gap-6 px-5 md:px-8 lg:px-0">
      <div class="flex w-full items-center justify-between gap-4">
        <em class="text-xl font-bold tracking-tighter">
          hw <span class="text-primary">.</span>
        </em>

        <nav class="hidden gap-4 md:flex">
          <a class="border-b" href="#about">{{ translate('nav.about') }} 🡥</a>

          <a class="border-b" href="#experience"
            >{{ translate('nav.experience') }} 🡥</a
          >

          <a class="border-b" href="#competence"
            >{{ translate('nav.skills') }} 🡥</a
          >

          <a class="border-b" href="#contact"
            >{{ translate('nav.contact') }} 🡥</a
          >
        </nav>

        <div class="hidden items-center gap-1 rounded-full border p-1 md:flex">
          <button
            type="button"
            class="cursor-pointer rounded-full px-4 py-2"
            :class="locale === 'pt' ? 'bg-primary text-white' : ''"
            :aria-pressed="locale === 'pt'"
            @click="setLocale('pt')"
          >
            PT
          </button>

          <button
            type="button"
            class="cursor-pointer rounded-full px-4 py-2"
            :class="locale === 'en' ? 'bg-primary text-white' : ''"
            :aria-pressed="locale === 'en'"
            @click="setLocale('en')"
          >
            EN
          </button>
        </div>

        <button
          type="button"
          class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border md:hidden"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'"
          @click="menuOpen = !menuOpen"
        >
          <span aria-hidden="true" class="text-xl leading-none">
            {{ menuOpen ? '×' : '☰' }}
          </span>
        </button>
      </div>

      <div
        v-if="menuOpen"
        id="mobile-menu"
        class="border-gray/10 flex flex-col gap-6 border-t pt-6 md:hidden"
      >
        <nav class="flex flex-col items-start gap-5">
          <a class="border-b" href="#about" @click="closeMenu">
            {{ translate('nav.about') }} 🡥
          </a>

          <a class="border-b" href="#experience" @click="closeMenu">
            {{ translate('nav.experience') }} 🡥
          </a>

          <a class="border-b" href="#competence" @click="closeMenu">
            {{ translate('nav.skills') }} 🡥
          </a>

          <a class="border-b" href="#contact" @click="closeMenu">
            {{ translate('nav.contact') }} 🡥
          </a>
        </nav>

        <div class="flex items-center gap-1 self-start rounded-full border p-1">
          <button
            type="button"
            class="cursor-pointer rounded-full px-4 py-2"
            :class="locale === 'pt' ? 'bg-primary text-white' : ''"
            :aria-pressed="locale === 'pt'"
            @click="setLocale('pt')"
          >
            PT
          </button>

          <button
            type="button"
            class="cursor-pointer rounded-full px-4 py-2"
            :class="locale === 'en' ? 'bg-primary text-white' : ''"
            :aria-pressed="locale === 'en'"
            @click="setLocale('en')"
          >
            EN
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
