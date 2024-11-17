// https://nuxt.com/docs/api/configuration/nuxt-config

import {config} from "dotenv";

config({path:'.env.local'})

export default defineNuxtConfig({

  modules: [
    '@nuxt/icon',
    '@nuxtjs/supabase',
    '@nuxt/eslint',
    '@pinia/nuxt',
  ],
  build: {
    transpile: ['trpc-nuxt']
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-04-03',

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  supabase:{
  },

  eslint: {
    config: {
      stylistic: {
        indent: 2, // indent 2
        quotes: 'single', // singleかdoubleか
        semi: true, // セミコロンが必要かどうか
      },
    },
  },
})
