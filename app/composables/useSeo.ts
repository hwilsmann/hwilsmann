export const useSeo = () => {
  useSeoMeta({
    title: 'Henrique Wilsmann — Desenvolvedor Front-end',
    description:
      'Desenvolvedor Front-end com mais de 11 anos de experiência em desenvolvimento web, com experiência sólida em Vue.js, Nuxt, TypeScript, JavaScript e Tailwind CSS. Atuo no desenvolvimento e evolução de aplicações web, com foco em arquitetura front-end, componentes reutilizáveis, performance, acessibilidade, UX e integração com APIs REST. Busco construir interfaces consistentes, escaláveis e sustentáveis, equilibrando qualidade técnica, boas práticas de engenharia e uma experiência intuitiva para o usuário.',
    ogUrl: 'https://hwilsmann.vercel.app',
    ogTitle: 'Henrique Wilsmann — Desenvolvedor Front-end',
    ogDescription:
      'Desenvolvedor Front-end com mais de 11 anos de experiência em desenvolvimento web, com experiência sólida em Vue.js, Nuxt, TypeScript, JavaScript e Tailwind CSS. Atuo no desenvolvimento e evolução de aplicações web, com foco em arquitetura front-end, componentes reutilizáveis, performance, acessibilidade, UX e integração com APIs REST. Busco construir interfaces consistentes, escaláveis e sustentáveis, equilibrando qualidade técnica, boas práticas de engenharia e uma experiência intuitiva para o usuário.',
    ogType: 'website',
    ogLocale: 'pt_BR',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Henrique Wilsmann — Desenvolvedor Front-end',
    twitterDescription:
      'Desenvolvedor Front-end com mais de 11 anos de experiência em desenvolvimento web, com experiência sólida em Vue.js, Nuxt, TypeScript, JavaScript e Tailwind CSS. Atuo no desenvolvimento e evolução de aplicações web, com foco em arquitetura front-end, componentes reutilizáveis, performance, acessibilidade, UX e integração com APIs REST. Busco construir interfaces consistentes, escaláveis e sustentáveis, equilibrando qualidade técnica, boas práticas de engenharia e uma experiência intuitiva para o usuário.',
  })

  useHead({
    link: [
      {
        rel: 'canonical',
        href: 'https://hwilsmann.vercel.app',
      },
    ],
    meta: [
      {
        name: 'theme-color',
        content: '#00ab8a',
      },
    ],
  })

  useSchemaOrg([
    {
      '@type': 'Person',
      name: 'Henrique Wilsmann',
      url: 'https://hwilsmann.vercel.app',
      jobTitle: 'Desenvolvedor Front-end',
      description:
        'Desenvolvedor Front-end com mais de 11 anos de experiência em desenvolvimento web, com experiência sólida em Vue.js, Nuxt, TypeScript, JavaScript e Tailwind CSS. Atuo no desenvolvimento e evolução de aplicações web, com foco em arquitetura front-end, componentes reutilizáveis, performance, acessibilidade, UX e integração com APIs REST. Busco construir interfaces consistentes, escaláveis e sustentáveis, equilibrando qualidade técnica, boas práticas de engenharia e uma experiência intuitiva para o usuário.',
      sameAs: [
        'https://www.linkedin.com/in/hwilsmann/',
        'https://github.com/hwilsmann',
      ],
      knowsAbout: [
        'Desenvolvimento Front-end',
        'Vue.js',
        'Nuxt',
        'TypeScript',
        'JavaScript',
        'Tailwind CSS',
        'Arquitetura Front-end',
        'Design Systems',
        'Performance Web',
        'Acessibilidade Web',
        'Integração com APIs',
        'Desenvolvimento de Interfaces Web',
      ],
    },
  ])
}
