export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Inter:400,500,700&display=swap',
        },
      ],
    },
  },
  nitro: {
    routeRules: {
      "/**": {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      port: 3000,
    },
    resolve: {
      alias: {
        '@': '/home/kavia/workspace/code-generation/noteease-1756-1765/notes_frontend',
      },
    },
  },
  alias: {
    '@': '/home/kavia/workspace/code-generation/noteease-1756-1765/notes_frontend',
  },
});
