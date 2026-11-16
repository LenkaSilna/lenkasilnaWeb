import type {NextApiRequest, NextApiResponse} from 'next'
import {Resend} from 'resend'
import {z} from 'zod'

// In-memory rate limit: 1 submission per IP per 60s
const rateLimitMap = new Map<string, number>()

function isRateLimited(ip: string): boolean {
	if (process.env.NODE_ENV === 'development') return false
	const now = Date.now()
	const last = rateLimitMap.get(ip) ?? 0
	if (now - last < 60_000) return true
	rateLimitMap.set(ip, now)
	return false
}

const schema = z.object({
	name: z.string().max(100).optional(),
	email: z.string().email(),
	message: z.string().min(5).max(5000),
	consent: z.literal(true),
	honeypot: z.literal(''),
})

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({error: 'Method not allowed'})
	}

	const ip =
		(req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ??
		req.socket.remoteAddress ??
		'unknown'

	if (isRateLimited(ip)) {
		return res.status(429).json({error: 'Too many requests'})
	}

	const parsed = schema.safeParse(req.body)
	if (!parsed.success) {
		return res.status(400).json({error: 'Invalid input'})
	}

	const {name, email, message} = parsed.data

	const apiKey = process.env.RESEND_API_KEY
	const fromEmail = process.env.RESEND_FROM_EMAIL
	const toEmail = process.env.CONTACT_TO_EMAIL

	if (!apiKey || !fromEmail || !toEmail) {
		console.error('Missing env:', {
			RESEND_API_KEY: Boolean(apiKey),
			RESEND_FROM_EMAIL: Boolean(fromEmail),
			CONTACT_TO_EMAIL: Boolean(toEmail),
		})
		return res.status(500).json({error: 'Server misconfigured'})
	}

	const resend = new Resend(apiKey)

	const {error} = await resend.emails.send({
		from: `lenkasilna.cz <${fromEmail}>`,
		to: [toEmail],
		replyTo: email,
		subject: `[lenkasilna.cz] Nová zpráva${name ? ` od ${name}` : ''}`,
		text: `Nová zpráva z webu lenkasilna.cz\n\nOd: ${name ?? 'Anonym'} <${email}>\n\n${message}`,
	})

	if (error) {
		console.error('Resend error:', error)
		return res.status(500).json({error: 'Failed to send email'})
	}

	return res.status(200).json({ok: true})
}
