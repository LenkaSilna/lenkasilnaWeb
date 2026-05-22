import * as Sentry from '@sentry/nextjs'

Sentry.init({
	dsn: 'https://a1059dcd15cbe26b498172e0d70f8b9c@o4511432942223360.ingest.us.sentry.io/4511432959787008',

	tracesSampleRate: 1,

	replaysSessionSampleRate: 0,
	replaysOnErrorSampleRate: 1.0,

	integrations: [Sentry.replayIntegration()],
})
