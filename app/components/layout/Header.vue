<script setup lang="ts">
import { ref } from 'vue'

const { locale, setLocale, translate } = useLocale()

const menuOpen = ref(false)
const closeMenu = () => {
  menuOpen.value = false
}
</script>

<template>
  <header id="header" class="bg-dark-gray sticky top-0 left-0 z-1 py-4 md:py-8">
    <div class="mx-auto flex max-w-6xl flex-col gap-6 px-5 md:px-8 lg:px-0">
      <div class="flex w-full items-center justify-between gap-4">
        <em class="text-xl font-bold tracking-tighter">
          hw <span class="text-primary">.</span>
        </em>

        <nav aria-label="Navegação principal" class="hidden gap-4 md:flex">
          <a
            class="flex items-center gap-1 border-b focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            href="#about"
          >
            {{ translate('header.nav.about') }} <Arrow />
          </a>

          <a
            class="flex items-center gap-1 border-b focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            href="#journey"
          >
            {{ translate('header.nav.journey') }} <Arrow />
          </a>

          <a
            class="flex items-center gap-1 border-b focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            href="#technology"
          >
            {{ translate('header.nav.technology') }} <Arrow />
          </a>

          <a
            class="flex items-center gap-1 border-b focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            href="#contact"
          >
            {{ translate('header.nav.contact') }} <Arrow />
          </a>
        </nav>

        <div class="hidden items-center gap-1 rounded-full border p-1 md:flex">
          <button
            type="button"
            class="cursor-pointer rounded-full px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            :class="locale === 'pt' ? 'bg-primary text-white' : ''"
            :aria-pressed="locale === 'pt'"
            @click="setLocale('pt')"
          >
            PT
          </button>

          <button
            type="button"
            class="cursor-pointer rounded-full px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            :class="locale === 'en' ? 'bg-primary text-white' : ''"
            :aria-pressed="locale === 'en'"
            @click="setLocale('en')"
          >
            EN
          </button>
        </div>

        <button
          type="button"
          class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:hidden"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          :aria-label="
            menuOpen
              ? translate('header.aria.close')
              : translate('header.aria.open')
          "
          @click="menuOpen = !menuOpen"
        >
          <span aria-hidden="true" class="text-xl leading-none">
            <Close v-if="menuOpen" />
            <Menu v-else />
          </span>
        </button>
      </div>

      <div
        v-if="menuOpen"
        id="mobile-menu"
        class="border-gray/10 flex flex-col gap-6 border-t pt-6 md:hidden"
      >
        <nav
          aria-label="Navegação mobile"
          class="flex flex-col items-start gap-5"
        >
          <a
            class="flex items-center gap-1 border-b focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            href="#about"
            @click="closeMenu"
          >
            {{ translate('header.nav.about') }} <Arrow />
          </a>

          <a
            class="flex items-center gap-1 border-b focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            href="#journey"
            @click="closeMenu"
          >
            {{ translate('header.nav.journey') }} <Arrow />
          </a>

          <a
            class="flex items-center gap-1 border-b focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            href="#technology"
            @click="closeMenu"
          >
            {{ translate('header.nav.technology') }} <Arrow />
          </a>

          <a
            class="flex items-center gap-1 border-b focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            href="#contact"
            @click="closeMenu"
          >
            {{ translate('header.nav.contact') }} <Arrow />
          </a>
        </nav>

        <div class="flex items-center gap-1 self-start rounded-full border p-1">
          <button
            type="button"
            class="cursor-pointer rounded-full px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            :class="locale === 'pt' ? 'bg-primary text-white' : ''"
            :aria-pressed="locale === 'pt'"
            @click="setLocale('pt')"
          >
            PT
          </button>

          <button
            type="button"
            class="cursor-pointer rounded-full px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
