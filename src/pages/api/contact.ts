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

const resend = new Resend(process.env.RESEND_API_KEY)

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

	const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'noreply@lenkasilna.cz'
	const toEmail = process.env.CONTACT_TO_EMAIL ?? 'lenka@lenkasilna.cz'

	const {error} = await resend.emails.send({
		from: `Portfolio <${fromEmail}>`,
		to: [toEmail],
		replyTo: email,
		subject: `[Portfolio] Nová zpráva${name ? ` od ${name}` : ''}`,
		text: `Nová zpráva z portfolia\n\nOd: ${name ?? 'Anonym'} <${email}>\n\n${message}`,
	})

	if (error) {
		return res.status(500).json({error: 'Failed to send email'})
	}

	return res.status(200).json({ok: true})
}
