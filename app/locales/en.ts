export default {
  nav: {
    about: 'About',
    experience: 'Experience',
    skills: 'Skill',
    contact: 'Contact',
  },

  hero: {
    label: '01 — Nice to meet you, I’m Henrique.',
    title: 'Between the logic of code and the freedom of',
    emphasis: 'design',
    description:
      'I build digital interfaces where engineering and visual expression meet. I turn ideas into intuitive experiences, exploring everything from code structure to motion and the details that make every interaction unique.',
    anchor: 'A little about me',
  },

  about: {
    label: '02 — About',
    title: {
      first: 'Front-end',
      second: 'Developer',
    },
    location: 'Novo Hamburgo — Brazil',
    description: {
      first:
        'My work lies at the intersection of development and design. I turn visual concepts into functional interfaces, seeking a balance between thoughtful presentation, natural interactions, and a solid technical foundation.',
      second:
        'I value well-considered solutions, clean code, and attention to the details that make a difference in the user experience. Rather than simply recreating an interface, I aim to understand the intent behind each element and translate it into a cohesive digital experience.',
    },
    anchor: {
      linkedin: 'LinkedIn',
      github: 'GitHub',
      email: 'Email',
    },
    principles: [
      {
        title: 'Adaptive Interfaces',
        description:
          'I build responsive interfaces that preserve visual hierarchy and usability across devices, with attention to semantics, consistency, and implementation details.',
      },
      {
        title: 'Accessibility by Design',
        description:
          'I consider accessibility an essential part of interface development, focusing on semantic HTML, keyboard navigation, sufficient contrast, and compatibility with assistive technologies.',
      },
      {
        title: 'Code Built to Evolve',
        description:
          'I organize components and styles to support reusability, maintainability, and project growth, following development best practices and using Git for version control.',
      },
    ],
  },

  experience: {
    label: '03 — Experience',
    title: {
      first: 'Every step',
      second: 'a new perspective',
    },
    experiences: [
      {
        period: '2024 — Present',
        company: 'Sesiom',
        workload: 'Front-end Developer',
        location: 'Novo Hamburgo, Rio Grande do Sul, Brazil — Hybrid',
        highlights: [
          'Development and enhancement of an internal enterprise system in a legacy ASP and JavaScript environment, focusing on code quality, web performance, and user experience.',
          'Implementation of new features and continuous improvements aligned with business rules and client needs.',
          'Integration with internal APIs and services for data consumption and manipulation.',
          'Performance optimization through reduced requests, improved queries, and code refactoring, resulting in faster load times.',
          'Application of code organization and maintainability best practices in a legacy environment.',
          'Collaboration with back-end teams to analyze requirements and define technical solutions.',
        ],
      },
      {
        period: '2020 — 2024',
        company: 'Olist',
        workload: 'Front-end Developer',
        location: 'Porto Alegre, Rio Grande do Sul, Brazil — Remote',
        highlights: [
          'Development and enhancement of an e-commerce platform, delivering high-performance and accessible shopping experiences for thousands of stores in a high-traffic environment.',
          'Web performance optimization focused on Core Web Vitals and Lighthouse, achieving improvements of up to 75% in performance metrics.',
          'Development of interfaces and templates using Liquid, JavaScript, and React, ensuring flexibility and continuous platform evolution.',
          'Participation in technical decisions, front-end architecture, and code reviews.',
          'Implementation of features focused on conversion, usability, and user experience.',
          'Integration with platform APIs and services, ensuring consistency and scalability.',
          'Application of technical SEO and digital accessibility best practices (WCAG).',
        ],
      },
      {
        period: '2018 — 2019',
        company: 'Voren',
        workload: 'Front-end Developer',
        location: 'Novo Hamburgo, Rio Grande do Sul, Brazil — On-site',
        highlights: [
          'Development and maintenance of front-end interfaces for e-commerce platforms and corporate websites, focusing on responsiveness, usability, and cross-browser compatibility.',
          'Development of responsive interfaces using HTML, CSS, and JavaScript.',
          'Collaboration with design and back-end teams to implement layouts that closely follow specifications.',
          'Focus on UX, accessibility, and usability.',
        ],
      },
      {
        period: '2015 — 2018',
        company: 'Trinto',
        workload: 'Front-end Developer',
        location: 'São Leopoldo, Rio Grande do Sul, Brazil — On-site',
        highlights: [
          'Development and customization of e-commerce platforms, focusing on front-end performance, responsiveness, and legacy system maintenance.',
          'Customization of e-commerce interfaces and features according to business rules and client needs.',
          'Implementation of front-end performance improvements to reduce load times.',
          'Maintenance and gradual modernization of legacy systems.',
        ],
      },
    ],
  },

  skills: {
    label: '04 — Skills',
    title: {
      first: 'My',
      second: 'Skills',
    },
    competencies: [
      {
        title: 'Development & Technologies',
        skills: [
          'Vue.js',
          'Nuxt',
          'React',
          'TypeScript',
          'JavaScript',
          'ASP.NET',
          'Liquid',
          'HTML',
          'CSS',
          'Sass',
          'Tailwind CSS',
          'REST APIs',
        ],
      },
      {
        title: 'Tools & Optimization',
        skills: ['Git', 'Figma', 'SEO', 'Web Performance', 'Core Web Vitals'],
      },
      {
        title: 'Practices & Quality',
        skills: [
          'Responsive Design',
          'Cross-browser Compatibility',
          'Accessibility',
          'Clean Code',
        ],
      },
    ],
  },

  contact: {
    label: '05 — Contact',
    title: {
      first: 'Have a project?',
      second: "Let's talk",
    },
    description:
      'I enjoy building digital solutions that balance functionality, simplicity, and attention to detail. If you’re looking for someone to collaborate on developing a product or web experience, I’d be happy to talk.',
  },

  footer: {
    copyright: 'All rights reserved.',
    anchor: 'Back to top',
  },
} as const
