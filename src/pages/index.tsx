import styled from 'styled-components'
import {useTranslation} from '../localization'
import {useLanguage} from '../context/LanguageContext'
import SEO from '../components/SEO'
import ContactForm from '../components/ContactForm'

const LOCALE_MAP: Record<string, string> = {
	cs: 'cs-CZ',
	en: 'en-US',
	de: 'de-DE',
	esp: 'es-ES',
}

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

/* ─── Experience ─────────────────────────────────────────────── */
const ExperienceList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: var(--space-lg);
`

const ExperienceItem = styled.li`
	display: grid;
	grid-template-columns: 1fr;
	gap: var(--space-xs);

	@media (min-width: 640px) {
		grid-template-columns: 180px 1fr;
		gap: var(--space-md);
	}
`

const ExpPeriod = styled.span`
	font-size: 0.8125rem;
	color: var(--color-text-muted);
	white-space: nowrap;
`

const ExpBody = styled.div``

const ExpRole = styled.div`
	font-weight: 600;
`

const ExpCompany = styled.div`
	color: var(--color-text-muted);
	font-size: 0.9rem;
`

const ExpType = styled.div`
	font-size: 0.8125rem;
	color: var(--color-text-muted);
`

const ExpDesc = styled.p`
	margin-top: var(--space-xs);
	font-size: 0.9rem;
`

/* ─── Skills ─────────────────────────────────────────────────── */
const SkillsGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: var(--space-lg);

	@media (min-width: 640px) {
		grid-template-columns: repeat(3, 1fr);
	}
`

const SkillGroup = styled.div``

const SkillGroupTitle = styled.h3`
	font-size: 0.875rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	color: var(--color-text-muted);
	margin-bottom: var(--space-sm);
`

const SkillList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: var(--space-xs);
	font-size: 0.9rem;
`

/* ─── Education ──────────────────────────────────────────────── */
const EduGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: var(--space-xl);

	@media (min-width: 640px) {
		grid-template-columns: 1fr 1fr;
	}
`

const EduBlock = styled.div``

const EduSubtitle = styled.h3`
	font-size: 0.875rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	color: var(--color-text-muted);
	margin-bottom: var(--space-sm);
`

const EduList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: var(--space-md);
	font-size: 0.9rem;
`

const EduItem = styled.li``

const EduSchool = styled.div`
	font-weight: 600;
`

const EduField = styled.div`
	color: var(--color-text-muted);
`

const EduDegree = styled.div`
	font-size: 0.8125rem;
	color: var(--color-text-muted);
`

/* ─── Data ───────────────────────────────────────────────────── */
const experiences = [
	{
		key: 'vocalls',
		period: '02/2025–dosud',
		company: 'Vocalls (Callminer)',
		role: 'QA Engineer',
		type: 'full-time contractor',
	},
	{
		key: 'faktura',
		period: '03/2023–03/2025',
		company: 'FakturaOnline.cz',
		role: 'QA Engineer',
		type: 'part-time contractor',
	},
	{
		key: 'iguana',
		period: '12/2021–05/2024',
		company: 'Iguana Technology',
		role: 'QA Engineer',
		type: 'full-time/part-time contractor',
	},
	{
		key: 'motionlab',
		period: '06/2021–07/2022',
		company: 'Motionlab.io',
		role: 'Frontend Developer',
		type: 'full-time contractor',
	},
	{
		key: 'matchhype',
		period: '05/2023–12/2024',
		company: 'Matchhype.com',
		role: 'Frontend Developer',
		type: 'full-time contractor',
	},
	{
		key: 'alfa',
		period: '04/2023–02/2026',
		company: 'Alfa Industries s.r.o.',
		role: 'Frontend Developer',
		type: 'part-time contractor',
	},
]

const skillGroups = [
	{
		titleKey: 'skills.testing',
		items: [
			{label: 'Playwright', icon: '/icons/playwright.svg'},
			{label: 'Cypress', icon: '/icons/cypress.svg'},
			{label: 'TestCafe', icon: '/icons/testcafe.svg'},
			{label: 'Cucumber', icon: '/icons/cucumber.svg'},
			{label: 'Postman', icon: '/icons/postman.svg'},
			{label: 'Insomnia', icon: '/icons/insomnia.svg'},
			{label: 'Locust', icon: '/icons/locust.svg'},
			{label: 'Qase', icon: '/icons/qase.svg'},
			{label: 'TestRail', icon: '/icons/testrail.svg'},
			{label: 'SQL', icon: '/icons/sql.svg'},
		],
	},
	{
		titleKey: 'skills.development',
		items: [
			{label: 'React', icon: '/icons/react.svg'},
			{label: 'Next.js', icon: '/icons/nextjs.svg'},
			{label: 'TypeScript', icon: '/icons/typescript.svg'},
			{label: 'JavaScript', icon: '/icons/javascript.svg'},
			{label: 'Styled Components', icon: '/icons/styledcomponents.svg'},
			{label: 'SCSS', icon: '/icons/sass.svg'},
			{label: 'Node.js', icon: '/icons/nodejs.svg'},
			{label: 'Docker', icon: '/icons/docker.svg'},
			{label: 'GitHub', icon: '/icons/github.svg'},
			{label: 'GitLab', icon: '/icons/gitlab.svg'},
			{label: 'GitHub Actions', icon: '/icons/githubactions.svg'},
			{label: 'CircleCI', icon: '/icons/circleci.svg'},
		],
	},
	{
		titleKey: 'skills.design',
		items: [
			{label: 'Figma', icon: '/icons/figma.svg'},
			{label: 'Adobe CC', icon: '/icons/adobecc.svg'},
			{label: 'Affinity', icon: '/icons/affinity.svg'},
		],
	},
]

const education = [
	{
		school: 'Univerzita Karlova v Praze',
		fieldKey: 'education.field.arts',
		degree: 'Bc.',
	},
	{
		school: 'Výtvarná škola Václava Hollara',
		fieldKey: 'education.field.graphic',
		degree: 'Maturita',
	},
]

const languageCodes = [
	{code: 'en', level: 'B2'},
	{code: 'es', level: 'A2'},
	{code: 'de', level: 'A1'},
]

const Home = () => {
	const {t} = useTranslation()
	const {lang} = useLanguage()
	const displayNames = new Intl.DisplayNames([LOCALE_MAP[lang] ?? 'en-US'], {
		type: 'language',
	})
	return (
		<>
			<SEO page="home" />
			<Hero id="about">
				<h1>{t('hi')}</h1>
				<p>{t('about.intro')}</p>
			</Hero>
			<Section id="experience">
				<SectionTitle>{t('nav.experience')}</SectionTitle>
				<ExperienceList>
					{experiences.map(({key, period, company, role, type}) => (
						<ExperienceItem key={key}>
							<ExpPeriod>{period}</ExpPeriod>
							<ExpBody>
								<ExpRole>{role}</ExpRole>
								<ExpCompany>{company}</ExpCompany>
								<ExpType>{type}</ExpType>
								{t(`experience.${key}.desc`) && (
									<ExpDesc>
										{t(`experience.${key}.desc`)}
									</ExpDesc>
								)}
							</ExpBody>
						</ExperienceItem>
					))}
				</ExperienceList>
			</Section>
			<Section id="skills">
				<SectionTitle>{t('nav.skills')}</SectionTitle>
				<SkillsGrid>
					{skillGroups.map(({titleKey, items}) => (
						<SkillGroup key={titleKey}>
							<SkillGroupTitle>{t(titleKey)}</SkillGroupTitle>
							<SkillList>
								{items.map((item) => (
									<li
										key={item.label}
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: 'var(--space-sm)',
										}}
									>
										<img
											src={item.icon}
											alt=""
											width={16}
											height={16}
											style={{
												objectFit: 'contain',
												flexShrink: 0,
											}}
										/>
										<span>{item.label}</span>
									</li>
								))}
							</SkillList>
						</SkillGroup>
					))}
				</SkillsGrid>
			</Section>
			<Section id="podcast">
				<SectionTitle>{t('nav.podcast')}</SectionTitle>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns:
							'repeat(auto-fit, minmax(280px, 1fr))',
						gap: 'var(--space-md)',
					}}
				>
					<iframe
						style={{borderRadius: '12px'}}
						src="https://open.spotify.com/embed/episode/6jx2qv04B5CrShN91Alhv5?utm_source=generator"
						width="100%"
						height={152}
						frameBorder="0"
						allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
						loading="lazy"
					/>
					<iframe
						style={{borderRadius: '12px'}}
						src="https://open.spotify.com/embed/episode/5UdfhGbyFIfy7dGb8wySLg?utm_source=generator"
						width="100%"
						height={152}
						frameBorder="0"
						allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
						loading="lazy"
					/>
				</div>
			</Section>
			<Section id="speaking">
				<SectionTitle>{t('nav.speaking')}</SectionTitle>
				<a
					href="https://cz.pycon.org/2023/program/talks/78/"
					target="_blank"
					rel="noopener noreferrer"
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 'var(--space-md)',
						textDecoration: 'none',
						color: 'inherit',
					}}
				>
					<img
						src="/icons/pycon.svg"
						alt="PyCon"
						width={32}
						height={32}
						style={{flexShrink: 0}}
					/>
					<div>
						<div style={{fontWeight: 600}}>
							{t('speaking.pycon.title')}
						</div>
						<div
							style={{
								fontSize: '0.875rem',
								color: 'var(--color-text-muted)',
							}}
						>
							{t('speaking.pycon.event')}
						</div>
						<div
							style={{
								fontSize: '0.875rem',
								marginTop: 'var(--space-xs)',
							}}
						>
							{t('speaking.pycon.desc')}
						</div>
					</div>
				</a>
			</Section>
			<Section id="contact">
				<SectionTitle>{t('nav.contact')}</SectionTitle>
				<ContactForm />
			</Section>
		</>
	)
}

export default Home
