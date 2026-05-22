import {withSentryConfig} from '@sentry/nextjs'
import {createRequire} from 'module'
const require = createRequire(import.meta.url)
const {version} = require('./package.json')

/** @type {import('next').NextConfig} */
const nextConfig = {
	trailingSlash: true,
	i18n: {
		locales: ['en', 'cs', 'de', 'es'],
		defaultLocale: 'en',
		localeDetection: false,
	},
	env: {
		NEXT_PUBLIC_APP_VERSION: version,
	},
	allowedDevOrigins: ['172.20.10.4'],
	compiler: {
		styledComponents: true,
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'Link',
						value: [
							'</llms.txt>; rel="describedby"',
							'</sitemap.xml>; rel="sitemap"',
						].join(', '),
					},
					{
						key: 'Vary',
						value: 'Accept',
					},
				],
			},
		]
	},
}

export default withSentryConfig(nextConfig, {
	org: 'lenka-silna',
	project: 'javascript-nextjs',

	silent: !process.env.CI,
	widenClientFileUpload: true,
	tunnelRoute: '/monitoring',

	webpack: {
		treeshake: {
			removeDebugLogging: true,
		},
	},
})
