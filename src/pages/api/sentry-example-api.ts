import type {NextApiRequest, NextApiResponse} from 'next'
import * as Sentry from '@sentry/nextjs'

// Custom error class for Sentry testing
class SentryExampleAPIError extends Error {
	constructor(message: string | undefined) {
		super(message)
		this.name = 'SentryExampleAPIError'
	}
}
// A faulty API route to test Sentry's error monitoring
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function handler(_req: NextApiRequest, _res: NextApiResponse) {
	Sentry.logger.info('Sentry example API called')
	throw new SentryExampleAPIError(
		'This error is raised on the backend called by the example page.'
	)
}
