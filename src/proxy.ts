import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

function parsePage(pathname: string): string {
	const clean = pathname.replace(/\/$/, '') || '/'
	return clean === '/' ? 'home' : clean.replace(/^\//, '')
}

export function proxy(request: NextRequest) {
	const {pathname, locale} = request.nextUrl
	const accept = request.headers.get('accept') ?? ''
	if (!accept.includes('text/markdown') || pathname.startsWith('/api/'))
		return NextResponse.next()

	const page = parsePage(pathname)
	const headers = new Headers(request.headers)
	headers.set('x-md-page', page)
	headers.set('x-md-locale', locale ?? 'en')
	const url = request.nextUrl.clone()
	url.pathname = '/api/md/handle'
	url.search = ''
	return NextResponse.rewrite(url, {request: {headers}})
}

export const config = {
	matcher: ['/:path*'],
}
