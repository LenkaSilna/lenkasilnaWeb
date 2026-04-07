import styled from 'styled-components'
import {useTranslation} from '../localization'
import SEO from '../components/SEO'
import ContactForm from '../components/ContactForm'

const Section = styled.section`
	padding: var(--space-xl) 0;
	scroll-margin-top: var(--nav-height);

	& + & {
		border-top: 1px solid var(--color-border);
	}
`

const Hero = styled(Section)`
	padding: calc(var(--space-xl) * 2.5) 0;

	h1 {
		font-size: clamp(2rem, 5vw, 3rem);
		margin-bottom: var(--space-md);
	}

	p {
		color: var(--color-text-muted);
		font-size: 1.125rem;
		max-width: 560px;
	}
`

const SectionTitle = styled.h2`
	margin-bottom: var(--space-lg);
`

const Home = () => {
	const {t} = useTranslation()
	return (
		<>
			<SEO page="home" />
			<Hero id="about">
				<h1>{t('hi')}</h1>
				<p>{t('about.intro')}</p>
			</Hero>
			<Section id="portfolio">
				<SectionTitle>{t('nav.portfolio')}</SectionTitle>
				<p>{t('portfolio.soon')}</p>
			</Section>
			<Section id="contact">
				<SectionTitle>{t('nav.contact')}</SectionTitle>
				<ContactForm />
			</Section>
		</>
	)
}

export default Home
