import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { H3Error } from 'h3';

export default defineNitroPlugin(nitroApp => {
  const {
    public: { sentry },
  } = useRuntimeConfig();

  if (!sentry.dsn) {
    // eslint-disable-next-line no-console
    console.warn('Sentry DSN not set, skipping Sentry initialization');
    return;
  }

  // // @ts-ignore
  // // eslint-disable-next-line no-underscore-dangle
  // globalThis._sentryEsmLoaderHookRegistered = true;

  Sentry.init({
    dsn: sentry.dsn,
    environment: sentry.environment,
    release: sentry.release,
    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
  });

  nitroApp.hooks.hook('error', error => {
    if (error instanceof H3Error) {
      if (error.statusCode === 404) {
        return;
      }
    }

    Sentry.captureException(error);
  });

  nitroApp.hooks.hook('request', event => {
    const requestId = event.headers.get('x-request-id');
    Sentry.setTag('request_id', requestId);
    // eslint-disable-next-line no-param-reassign
    event.context.$sentry = Sentry;
  });

  nitroApp.hooks.hookOnce('close', async () => {
    await Sentry.close(2000);
  });
});
