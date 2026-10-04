<script setup lang="ts">
const experiences = [
  {
    period: '2024 — Presente',
    company: 'SESIOM Soluções Ltda',
    url: 'https://www.linkedin.com/company/28186808/',
    description:
      'Desenvolvimento e evolução de sistemas corporativos internos, trabalhando com aplicações legadas em ASP e JavaScript. Foco em performance, experiência do usuário, integração com APIs, qualidade de código e melhorias contínuas alinhadas às necessidades do negócio.',
    technologies: ['ASP', 'JavaScript', 'Web Performance'],
  },
  {
    period: '2020 — 2024',
    company: 'Olist',
    url: 'https://www.linkedin.com/company/9338131/',
    description:
      'Desenvolvimento frontend para uma plataforma de e-commerce de alto tráfego, com foco em performance, acessibilidade, conversão e experiência do usuário. Atuação com React, JavaScript e Liquid, contribuindo para arquitetura frontend, decisões técnicas, integrações com APIs, SEO e melhorias nos Core Web Vitals.',
    technologies: ['React', 'JavaScript', 'Liquid', 'Web Performance'],
  },
  {
    period: '2018 — 2019',
    company: 'Voren',
    url: 'https://www.linkedin.com/company/3026673/',
    description:
      'Desenvolvimento e manutenção frontend para plataformas de e-commerce e sites institucionais, com foco em interfaces responsivas, usabilidade, compatibilidade entre navegadores, acessibilidade e colaboração próxima com os times de Design e Backend.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    period: '2015 — 2018',
    company: 'Trinto | Digital Partners',
    url: 'https://www.linkedin.com/company/3364531/',
    description:
      'Desenvolvimento frontend e customização de plataformas de e-commerce, com foco em performance, interfaces responsivas e modernização e manutenção gradual de sistemas legados.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
  },
]
</script>

<template>
  <section>
    <div class="flex flex-col gap-5">
      <h2 class="text-gray text-sm font-medium tracking-widest uppercase">
        Experiência
      </h2>

      <div class="flex flex-col gap-8">
        <article
          v-for="experience in experiences"
          :key="experience.company"
          class="flex items-start gap-5"
        >
          <span class="text-gray w-28 shrink-0 text-sm">
            {{ experience.period }}
          </span>

          <div class="flex flex-col gap-5">
            <a
              class="hover:text-primary font-medium text-white transition-colors"
              :href="experience.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ experience.company }} &#8605;
            </a>

            <p>
              {{ experience.description }}
            </p>

            <ul class="flex flex-wrap gap-1">
              <li
                v-for="technology in experience.technologies"
                :key="technology"
                class="border-primary/20 bg-primary/10 text-primary rounded-full border px-2.5 py-1 text-xs font-bold"
              >
                {{ technology }}
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
