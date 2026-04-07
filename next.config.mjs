import {createRequire} from 'module'
const require = createRequire(import.meta.url)
const {version} = require('./package.json')

/** @type {import('next').NextConfig} */
const nextConfig = {
	trailingSlash: true,
	env: {
		NEXT_PUBLIC_APP_VERSION: version,
	},
	allowedDevOrigins: ['172.20.10.4'],
	compiler: {
		styledComponents: true,
	},
}

export default nextConfig
