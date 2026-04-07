import React, {useState, FormEvent} from 'react'
import styled, {css} from 'styled-components'
import {useTranslation} from '../localization'

type Status = 'idle' | 'sending' | 'success' | 'error'

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: var(--space-md);
	max-width: 560px;
`

const Field = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--space-xs);
`

const Label = styled.label`
	font-size: 0.875rem;
	color: var(--color-text-muted);
`

const fieldStyles = css`
	width: 100%;
	padding: var(--space-sm) var(--space-md);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-sm);
	background: var(--color-surface);
	color: var(--color-text);
	font-size: 1rem;
	font-family: inherit;
	transition: border-color var(--transition-fast);
	box-sizing: border-box;

	&:focus {
		outline: none;
		border-color: var(--color-accent);
	}
`

const Input = styled.input`
	${fieldStyles}
`

const Textarea = styled.textarea`
	${fieldStyles}
	resize: vertical;
	min-height: 140px;
`

const ConsentRow = styled.div`
	display: flex;
	gap: var(--space-sm);
	align-items: flex-start;
	font-size: 0.875rem;
	color: var(--color-text-muted);
	line-height: 1.5;

	input[type='checkbox'] {
		margin-top: 0.2rem;
		flex-shrink: 0;
		accent-color: var(--color-accent);
	}
`

const SubmitButton = styled.button`
	align-self: flex-start;
	padding: var(--space-sm) var(--space-lg);
	background: var(--color-accent);
	color: #fff;
	border: none;
	border-radius: var(--radius-sm);
	font-size: 1rem;
	font-family: inherit;
	cursor: pointer;
	transition: background var(--transition-fast);

	&:hover:not(:disabled) {
		background: var(--color-accent-hover);
	}

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
`

const StatusMessage = styled.p<{$error?: boolean}>`
	margin: 0;
	font-size: 0.875rem;
	color: ${({$error}) => ($error ? '#c0392b' : '#27ae60')};
`

const ContactForm = () => {
	const {t} = useTranslation()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')
	const [consent, setConsent] = useState(false)
	const [honeypot, setHoneypot] = useState('')
	const [status, setStatus] = useState<Status>('idle')
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		if (status === 'sending') return
		setStatus('sending')
		try {
			const res = await fetch('/api/contact/', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({name, email, message, consent, honeypot}),
			})
			if (res.ok) {
				setStatus('success')
				setName('')
				setEmail('')
				setMessage('')
				setConsent(false)
				setHoneypot('')
				setTimeout(() => setStatus('idle'), 5000)
			} else {
				setStatus('error')
			}
		} catch {
			setStatus('error')
		}
	}

	return (
		<Form onSubmit={handleSubmit}>
			{/* Honeypot — hidden from real users, visible to bots */}
			<div aria-hidden="true" style={{display: 'none'}}>
				<input
					type="text"
					name="website"
					value={honeypot}
					onChange={(e) => setHoneypot(e.target.value)}
					tabIndex={-1}
					autoComplete="off"
				/>
			</div>

			<Field>
				<Label htmlFor="contact-name">{t('contact.name')}</Label>
				<Input
					id="contact-name"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					autoComplete="name"
				/>
			</Field>

			<Field>
				<Label htmlFor="contact-email">
					{t('contact.email')} <span aria-hidden="true">*</span>
				</Label>
				<Input
					id="contact-email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					autoComplete="email"
				/>
			</Field>

			<Field>
				<Label htmlFor="contact-message">
					{t('contact.message')} <span aria-hidden="true">*</span>
				</Label>
				<Textarea
					id="contact-message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					required
				/>
			</Field>

			<ConsentRow>
				<input
					type="checkbox"
					id="contact-consent"
					checked={consent}
					onChange={(e) => setConsent(e.target.checked)}
					required
				/>
				<label htmlFor="contact-consent">{t('contact.consent')}</label>
			</ConsentRow>

			{status === 'error' && (
				<StatusMessage $error role="alert">
					{t('contact.error')}
				</StatusMessage>
			)}

			{status === 'success' ? (
				<StatusMessage role="status">
					{t('contact.success')}
				</StatusMessage>
			) : (
				<SubmitButton
					type="submit"
					disabled={status === 'sending'}
				>
					{status === 'sending'
						? t('contact.sending')
						: t('contact.submit')}
				</SubmitButton>
			)}
		</Form>
	)
}

export default ContactForm
