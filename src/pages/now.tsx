import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import BridgeBanner from '../components/BridgeBanner'
import {useTranslation} from '../localization'

const Wrapper = styled.div`
	width: 100%;
`

const Intro = styled.div`
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

const NowHighlight = styled(BridgeBanner)`
	margin-top: var(--space-xl);
`

const NowHeading = styled.h2`
	font-size: 1rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	color: var(--color-text-muted);
	margin-bottom: var(--space-sm);
`

const NowDesc = styled.p`
	font-size: 0.95rem;
	line-height: 1.7;
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
				<Intro>
					<BackLink>
						<Link href="/">← lenkasilna.cz</Link>
					</BackLink>
					<Title>{t('now.title')}</Title>
					<Updated>{t('now.updated')}</Updated>
					<NowSection>
						<NowHeading>{t('now.work')}</NowHeading>
						<NowDesc>{t('now.work.desc')}</NowDesc>
					</NowSection>
					<NowSection>
						<NowHeading>{t('now.learning')}</NowHeading>
						<NowDesc>{t('now.learning.desc')}</NowDesc>
					</NowSection>
					<NowSection>
						<NowHeading>{t('now.reading')}</NowHeading>
						<NowDesc>{t('now.reading.desc')}</NowDesc>
					</NowSection>
				</Intro>
				<NowHighlight
					eyebrow={t('bridge.eyebrow')}
					title={t('now.available')}
					text={t('now.available.desc')}
					ctaLabel={t('bridge.cta')}
					href="https://sw-tester.cz"
				/>
			</Wrapper>
		</>
	)
}

export default Now
