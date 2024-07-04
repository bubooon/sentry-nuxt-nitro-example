const {
    SENTRY_DSN,
    SENTRY_RELEASE,
    SENTRY_ENV,
    BUILD_MODE,
} = process.env;

const isDebug = BUILD_MODE !== 'production';

export default defineNuxtConfig({
  telemetry: false,

  experimental: {
      asyncContext: true,
  },

  app: {
      baseURL: '/',
      buildAssetsDir: '/_nuxt_app/',
  },

  sourcemap: {
      client: true,
      server: true,
  },

  ssr: true,
  debug: isDebug,

  runtimeConfig: {
      public: {
          sentry: {
              dsn: SENTRY_DSN,
              environment: SENTRY_ENV,
              release: SENTRY_RELEASE,
          },
      },
  },

  devtools: {
      enabled: false,
  },

  compatibilityDate: '2024-07-03',
});