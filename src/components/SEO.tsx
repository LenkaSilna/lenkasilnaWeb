import Head from 'next/head'
import {useLanguage} from '../context/LanguageContext'
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
		name: 'Lenka Silná',
		jobTitle: seo.title,
		description: seo.description,
		url: 'https://lenkasilna.com',
		knowsLanguage: ['cs', 'en', 'de', 'es'],
		sameAs: ['https://github.com/LenkaSilna', 'https://linkedin.com/in/LenkaSilna'],
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

			{/* hreflang for language variants */}
			{(Object.keys(HREFLANG_MAP) as LocalizationLanguages[]).map((l) => (
				<link
					key={l}
					rel="alternate"
					hrefLang={HREFLANG_MAP[l]}
					href={`https://lenkasilna.com`}
				/>
			))}
			<link
				rel="alternate"
				hrefLang="x-default"
				href="https://lenkasilna.com"
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
