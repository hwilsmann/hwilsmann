<script setup lang="ts">
import { ref } from 'vue'

const { locale, setLocale, translate } = useLocale()
const menuOpen = ref(false)

defineProps<{
  errorPage?: boolean
}>()
</script>

<template>
  <header id="header" class="bg-dark-gray sticky top-0 z-1 py-4 md:py-8">
    <div class="mx-auto flex max-w-6xl flex-col gap-6 px-5 md:px-8 lg:px-0">
      <div class="flex w-full items-center justify-between gap-4">
        <em class="text-xl font-bold tracking-tighter">
          hw <span class="text-primary">.</span>
        </em>

        <nav v-if="!errorPage" class="hidden gap-4 md:flex">
          <a class="flex items-center gap-1 border-b" href="#about">
            {{ translate('header.nav.about') }} <Arrow />
          </a>

          <a class="flex items-center gap-1 border-b" href="#journey">
            {{ translate('header.nav.journey') }} <Arrow />
          </a>

          <a class="flex items-center gap-1 border-b" href="#technology">
            {{ translate('header.nav.technology') }} <Arrow />
          </a>

          <a class="flex items-center gap-1 border-b" href="#contact">
            {{ translate('header.nav.contact') }} <Arrow />
          </a>
        </nav>

        <div class="hidden items-center gap-1 border p-1 md:flex">
          <button
            type="button"
            class="cursor-pointer px-4 py-2"
            :class="locale === 'pt' ? 'bg-primary text-white' : ''"
            @click="(setLocale('pt'), (menuOpen = false))"
          >
            PT
          </button>

          <button
            type="button"
            class="cursor-pointer px-4 py-2"
            :class="locale === 'en' ? 'bg-primary text-white' : ''"
            @click="(setLocale('en'), (menuOpen = false))"
          >
            EN
          </button>
        </div>

        <button
          type="button"
          class="flex h-10 w-10 cursor-pointer items-center justify-center border md:hidden"
          @click="menuOpen = !menuOpen"
        >
          <span class="text-xl">
            <Close v-if="menuOpen" />
            <Menu v-else />
          </span>
        </button>
      </div>

      <div
        v-if="menuOpen"
        class="border-gray/10 flex flex-col gap-6 border-t pt-6 md:hidden"
      >
        <nav class="flex flex-col items-start gap-5">
          <a
            class="flex items-center gap-1 border-b"
            href="#about"
            @click="menuOpen = false"
          >
            {{ translate('header.nav.about') }} <Arrow />
          </a>

          <a
            class="flex items-center gap-1 border-b"
            href="#journey"
            @click="menuOpen = false"
          >
            {{ translate('header.nav.journey') }} <Arrow />
          </a>

          <a
            class="flex items-center gap-1 border-b"
            href="#technology"
            @click="menuOpen = false"
          >
            {{ translate('header.nav.technology') }} <Arrow />
          </a>

          <a
            class="flex items-center gap-1 border-b"
            href="#contact"
            @click="menuOpen = false"
          >
            {{ translate('header.nav.contact') }} <Arrow />
          </a>
        </nav>

        <div class="flex items-center gap-1 self-start border p-1">
          <button
            type="button"
            class="cursor-pointer px-4 py-2"
            :class="locale === 'pt' ? 'bg-primary text-white' : ''"
            @click="(setLocale('pt'), (menuOpen = false))"
          >
            PT
          </button>

          <button
            type="button"
            class="cursor-pointer px-4 py-2"
            :class="locale === 'en' ? 'bg-primary text-white' : ''"
            @click="(setLocale('en'), (menuOpen = false))"
          >
            EN
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
