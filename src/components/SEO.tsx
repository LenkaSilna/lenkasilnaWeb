import Head from 'next/head'
import {useLanguage} from '../context/useLanguage'
import {LocalizationLanguages} from '../types/enums'
import seoData from '../data/seo.json'

interface SEOProps {
	page: keyof typeof seoData
}

const HREFLANG_MAP: Record<LocalizationLanguages, string> = {
	cs: 'cs',
	en: 'en',
	de: 'de',
	esp: 'es',
}

const SEO: React.FC<SEOProps> = ({page}) => {
	const {lang} = useLanguage()
	const seo = seoData[page][lang as LocalizationLanguages]

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Lenka Šilná',
		jobTitle: 'QA Engineer & Frontend Developer',
		description: seo.description,
		url: 'https://lenkasilna.cz',
		knowsLanguage: ['cs', 'en', 'de', 'es'],
		knowsAbout: [
			'QA testing',
			'test automation',
			'Playwright',
			'Cypress',
			'React',
			'Next.js',
			'LLM testing',
			'AI testing',
		],
		sameAs: [
			'https://github.com/LenkaSilna',
			'https://linkedin.com/in/LenkaSilna',
		],
	}

	return (
		<Head>
			<title>{seo.title}</title>
			<meta name="description" content={seo.description} />
			<meta name="keywords" content={seo.keywords} />
			<meta
				name="robots"
				content="index, follow, max-snippet:-1, max-image-preview:large"
			/>

			{/* Open Graph */}
			<meta property="og:type" content="website" />
			<meta property="og:title" content={seo.ogTitle} />
			<meta property="og:description" content={seo.ogDescription} />
			<meta property="og:image" content={seo.ogImage} />
			<meta
				property="og:locale"
				content={HREFLANG_MAP[lang as LocalizationLanguages]}
			/>

			{/* Twitter */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={seo.twitterTitle} />
			<meta name="twitter:description" content={seo.twitterDescription} />
			<meta name="twitter:image" content={seo.twitterImage} />

			{/* hreflang — canonical URL pro všechny jazykové varianty */}
			<link rel="alternate" hrefLang="cs" href="https://lenkasilna.cz" />
			<link rel="alternate" hrefLang="en" href="https://lenkasilna.cz" />
			<link rel="alternate" hrefLang="de" href="https://lenkasilna.cz" />
			<link rel="alternate" hrefLang="es" href="https://lenkasilna.cz" />
			<link
				rel="alternate"
				hrefLang="x-default"
				href="https://lenkasilna.cz"
			/>

			{/* JSON-LD structured data */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
			/>
		</Head>
	)
}

export default SEO
