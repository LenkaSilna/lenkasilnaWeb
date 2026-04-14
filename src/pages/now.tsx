import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import {useTranslation} from '../localization'

const Wrapper = styled.div`
	max-width: 640px;
`

const BackLink = styled.div`
	margin-bottom: var(--space-lg);
	font-size: 0.875rem;

	a {
		color: var(--color-text-muted);
		text-decoration: none;
		transition: color var(--transition-fast);

		&:hover {
			color: var(--color-text);
		}
	}
`

const Title = styled.h1`
	font-size: clamp(1.5rem, 4vw, 2.25rem);
	margin-bottom: var(--space-sm);
`

const Updated = styled.p`
	font-size: 0.8125rem;
	color: var(--color-text-muted);
	margin-bottom: var(--space-xl);
`

const NowSection = styled.section`
	margin-bottom: var(--space-lg);

	& + & {
		padding-top: var(--space-lg);
		border-top: 1px solid var(--color-border);
	}
`

const NowHighlight = styled.section`
	margin-top: var(--space-xl);
	padding: var(--space-xl);
	border: 1px solid var(--color-accent);
	border-radius: var(--radius-md);
	background: color-mix(in srgb, var(--color-accent) 6%, transparent);
`

const NowHeading = styled.h2`
	font-size: 1rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	color: var(--color-text-muted);
	margin-bottom: var(--space-sm);
`

const NowHighlightHeading = styled.h2`
	font-size: 1.125rem;
	font-weight: 600;
	color: var(--color-text);
	margin-bottom: var(--space-sm);
`

const NowDesc = styled.p`
	font-size: 0.95rem;
	line-height: 1.7;
`

const NowCta = styled.a`
	display: inline-block;
	margin-top: var(--space-lg);
	padding: 0.75rem 1.5rem;
	background: var(--color-accent);
	color: #fff;
	border-radius: var(--radius-sm);
	font-size: 0.9375rem;
	font-weight: 500;
	text-decoration: none;
	transition: background var(--transition-fast);

	&:hover {
		background: var(--color-accent-hover);
	}
`

const Now = () => {
	const {t} = useTranslation()

	return (
		<>
			<Head>
				<title>{t('now.seo.title')}</title>
				<meta name="description" content={t('now.seo.description')} />
				<meta name="robots" content="index, follow" />
			</Head>
			<Wrapper>
				<BackLink>
					<Link href="/">← lenkasilna.cz</Link>
				</BackLink>
				<Title>{t('now.title')}</Title>
				<Updated>{t('now.updated')}</Updated>
				<NowSection>
					<NowHeading>{t('now.learning')}</NowHeading>
					<NowDesc>{t('now.learning.desc')}</NowDesc>
				</NowSection>
				<NowSection>
					<NowHeading>{t('now.reading')}</NowHeading>
					<NowDesc>{t('now.reading.desc')}</NowDesc>
				</NowSection>
				<NowHighlight>
					<NowHighlightHeading>
						{t('now.available')}
					</NowHighlightHeading>
					<NowDesc>{t('now.available.desc')}</NowDesc>
					<NowCta href="/contact">{t('nav.contact')} →</NowCta>
				</NowHighlight>
			</Wrapper>
		</>
	)
}

export default Now
