import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import {useTranslation} from '../localization'
import ContactForm from '../components/ContactForm'

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

const Intro = styled.p`
	font-size: 0.95rem;
	color: var(--color-text-muted);
	margin-bottom: var(--space-xl);
	line-height: 1.7;
`

const Contact = () => {
	const {t} = useTranslation()

	return (
		<>
			<Head>
				<title>{t('contact.seo.title')}</title>
				<meta
					name="description"
					content={t('contact.seo.description')}
				/>
				<meta name="robots" content="index, follow" />
			</Head>
			<Wrapper>
				<BackLink>
					<Link href="/">{t('contact.back')}</Link>
				</BackLink>
				<Title>{t('contact.heading')}</Title>
				<Intro>{t('contact.intro')}</Intro>
				<ContactForm />
			</Wrapper>
		</>
	)
}

export default Contact
