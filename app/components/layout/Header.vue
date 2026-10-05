<template>
  <header>
    <div
      class="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:text-left"
    >
      <NuxtImg
        src="/images/avatar.png"
        alt="Henrique Wilsmann"
        width="150"
        height="150"
        sizes="150px"
        class="size-37.5 shrink-0 rounded-full object-cover"
      />

      <div class="flex flex-col items-center gap-1 sm:items-start">
        <h1 class="text-3xl font-medium text-white">Henrique Wilsmann</h1>

        <p class="text-gray leading-relaxed">
          Desenvolvedor Frontend — Interfaces de Produto, Design Systems &
          Experiências Digitais
        </p>

        <a
          class="text-gray hover:text-primary text-xs transition-colors"
          href="https://www.linkedin.com/in/hwilsmann/"
          target="_blank"
          rel="noopener noreferrer"
        >
          @hwilsmann &#8605;
        </a>
      </div>
    </div>
  </header>
</template>
