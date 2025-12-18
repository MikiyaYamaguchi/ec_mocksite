// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      ecMockApiUrl: ""
    }
  },
  nitro: {
    devProxy: {
      "/api": {
        target: "https://ec-mocksite-server.onrender.com",
        changeOrigin: true,
      },
    },
  },
})
