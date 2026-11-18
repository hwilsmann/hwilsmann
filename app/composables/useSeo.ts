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
        'React',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'HTML5',
        'CSS3',
        'Sass',
        'Tailwind CSS',
        'Liquid',

        'ASP.NET',
        'APIs REST',
        'PostgreSQL',
        'Prisma ORM',

        'Git',
        'Figma',
        'Arquitetura de Componentes',
        'Código Limpo',
        'Design Responsivo',
        'Acessibilidade Web',
        'Compatibilidade entre Navegadores',
        'Otimização de Performance',
        'Core Web Vitals',
        'SEO',
      ],
    },
  ])
}
