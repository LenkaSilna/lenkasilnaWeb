import styled from 'styled-components'

interface BridgeBannerProps {
	className?: string
	eyebrow: string
	title: string
	text: string
	ctaLabel: string
	href: string
	id?: string
}

export const BridgeBannerSection = styled.section`
	padding-top: var(--space-lg);
	padding-bottom: var(--space-lg);
`

const Root = styled.aside`
	position: relative;
	overflow: hidden;
	padding: clamp(1.25rem, 3vw, 2rem);
	border: 1px solid rgba(0, 102, 204, 0.18);
	border-radius: 18px;
	background:
		linear-gradient(
			135deg,
			rgba(0, 102, 204, 0.08),
			rgba(0, 102, 204, 0.02) 52%,
			rgba(255, 255, 255, 0) 100%
		),
		var(--color-surface);

	&::before {
		content: '';
		position: absolute;
		inset: 0 auto auto 0;
		width: 160px;
		height: 160px;
		background: radial-gradient(
			circle,
			rgba(0, 102, 204, 0.16) 0%,
			rgba(0, 102, 204, 0) 72%
		);
		pointer-events: none;
	}

	@media (min-width: 768px) {
		display: grid;
		grid-template-columns: minmax(0, 1.35fr) auto;
		gap: var(--space-lg);
		align-items: center;
	}
`

const Content = styled.div`
	position: relative;
	z-index: 1;
`

const Eyebrow = styled.p`
	margin: 0 0 var(--space-sm);
	font-size: 0.75rem;
	font-weight: 700;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	color: var(--color-accent);
`

const Title = styled.h2`
	margin: 0 0 var(--space-sm);
	font-size: clamp(1.2rem, 3vw, 1.65rem);
	line-height: 1.25;
`

const Text = styled.p`
	margin: 0;
	max-width: 60ch;
	font-size: 0.95rem;
	line-height: 1.7;
	color: var(--color-text-muted);
`

const Actions = styled.div`
	position: relative;
	z-index: 1;
	display: flex;
	align-items: center;
	margin-top: var(--space-lg);

	@media (min-width: 768px) {
		margin-top: 0;
		justify-content: flex-end;
	}
`

const CTA = styled.a`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: var(--space-sm);
	padding: 0.85rem 1.35rem;
	border-radius: 999px;
	background: var(--color-accent);
	color: #fff;
	font-size: 0.9375rem;
	font-weight: 600;
	text-decoration: none;
	transition:
		transform var(--transition-fast),
		background-color var(--transition-fast),
		box-shadow var(--transition-fast);

	&:hover {
		transform: translateY(-1px);
		background: var(--color-accent-hover);
		box-shadow: 0 10px 24px rgba(0, 102, 204, 0.22);
	}
`

const BridgeBanner = ({
	className,
	eyebrow,
	title,
	text,
	ctaLabel,
	href,
	id,
}: BridgeBannerProps) => {
	return (
		<Root className={className}>
			<Content>
				<Eyebrow>{eyebrow}</Eyebrow>
				<Title id={id}>{title}</Title>
				<Text>{text}</Text>
			</Content>
			<Actions>
				<CTA href={href} target="_blank" rel="noopener noreferrer">
					{ctaLabel}
				</CTA>
			</Actions>
		</Root>
	)
}

export default BridgeBanner
