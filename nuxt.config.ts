// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: [
    '~/plugins/sweetalert.ts',
    '~/plugins/qrcode-reader.js',
   '~/plugins/vue-cal.js',
   '~/plugins/vue-awesome-paginate.js',
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
      link: [
        { 
          rel: "icon", type: "image/ico", 
          href: "/images/total-sans-arriere-plan.png" 
        },
        { 
          rel: "stylesheet", 
          href: "https://unpkg.com/vue-cal/dist/vuecal.css" 
        },
      ]
    }
  },

  modules: ["@nuxt/content", "@pinia/nuxt", "@nuxtjs/google-fonts", "nuxt-easy-lightbox"],

  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]]
  },

  css: [
    "bootstrap-vue-next/dist/bootstrap-vue-next.css",
    "~/assets/scss/app.scss",
    "simplebar/dist/simplebar.css",
  ],

  alias: {
    assets: "/assets",
    public: "/public"
  },

  googleFonts: {
    families: {
      Poppins: [200, 300, 400, 500, 600],
      Inter: [200, 300, 400, 500, 600],
      "Open+Sans": [200, 300, 400, 500, 600],
      Nunito: [200, 300, 400, 500, 600],
      Karla: [200, 300, 400, 500, 600],
      Gantari: [200, 300, 400, 500, 600]
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