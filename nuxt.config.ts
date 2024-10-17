// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: [
    '~/plugins/sweetalert.ts',
  ],

  app: {
    head: {
      htmlAttrs: { dir: "ltr", lang: "fr" },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Responsive Bootstrap 5 Admin Dashboard"
        },
        { name: "author", content: "Themesbrand" }
      ],
      link: [{ rel: "icon", type: "image/ico", href: "/images/total-sans-arriere-plan.png" }]
    }
  },

  modules: ["@nuxt/content", "@pinia/nuxt", "@nuxtjs/google-fonts"],

  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]]
  },

  css: [
    "bootstrap-vue-next/dist/bootstrap-vue-next.css",
    "~/assets/scss/app.scss",
    "simplebar/dist/simplebar.css"
  ],

  alias: {
    assets: "/assets",
    public: "/public"
  },

  googleFonts: {
    families: {
      Poppins: [300, 400, 500, 600, 700],
      Inter: [300, 400, 500, 600, 700],
      "Open+Sans": [300, 400, 500, 600, 700],
      Nunito: [300, 400, 500, 600, 700],
      Karla: [300, 400, 500, 600, 700],
      Gantari: [300, 400, 500, 600, 700]
    },
    display: "swap"
  },

  runtimeConfig: {
    public: {
      auth: "fakebackend",
      API_URL: "https://keho-visitors.local/api"
    }
  },

  routeRules: {
    '/': {redirect: "/login"}
  },

  devtools: {
    enabled: true
  },

  compatibilityDate: "2024-10-07"
});