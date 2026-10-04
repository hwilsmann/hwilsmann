<script setup lang="ts">
const contacts = [
  {
    label: 'GitHub',
    value: '@hwilsmann',
    url: 'https://github.com/hwilsmann',
    external: true,
  },
  {
    label: 'LinkedIn',
    value: '@hwilsmann',
    url: 'https://www.linkedin.com/in/hwilsmann/',
    external: true,
  },
  {
    label: 'WhatsApp',
    value: '+55 (51) 99904-4946',
    url: 'https://wa.me/5551999044946',
    external: true,
  },
  {
    label: 'Email',
    value: 'hwilsmann83@gmail.com',
    url: 'mailto:hwilsmann83@gmail.com',
  },
]
</script>

<template>
  <section>
    <div class="flex flex-col gap-5">
      <h2 class="text-gray text-sm font-medium tracking-widest uppercase">
        Contato
      </h2>

      <ul class="flex flex-col gap-3">
        <li v-for="contact in contacts" :key="contact.label">
          <span class="text-gray inline-block w-28 text-sm">
            {{ contact.label }}
          </span>

          <a
            class="hover:text-primary focus-visible:outline-primary text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            :href="contact.url"
            :target="contact.external ? '_blank' : undefined"
            :rel="contact.external ? 'noopener noreferrer' : undefined"
          >
            {{ contact.value }} &#8605;
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
