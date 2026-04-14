import {useState} from 'react'
import styled from 'styled-components'
import {useTranslation} from '../localization'
import {useLanguage} from '../context/useLanguage'
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
	padding: calc(var(--space-xl) * 2.5) 0 calc(var(--space-xl) * 2);
	max-width: 680px;
`

const SectionTitle = styled.h2`
	margin-bottom: var(--space-lg);
`

const HeroEyebrow = styled.p`
	font-size: 0.8125rem;
	font-weight: 500;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: var(--color-accent);
	margin-bottom: var(--space-md);
`

const HeroTagline = styled.h1`
	font-size: clamp(1.75rem, 4vw, 2.5rem);
	font-weight: 700;
	line-height: 1.2;
	color: var(--color-text);
	margin-bottom: var(--space-lg);
	letter-spacing: -0.02em;
	max-width: 560px;

	span {
		color: var(--color-accent);
	}
`

const HeroMeta = styled.p`
	font-size: 0.9375rem;
	color: var(--color-text-muted);
	margin: 0;
	line-height: 1.6;

	strong {
		color: var(--color-text);
		font-weight: 500;
	}
`

const HeroActions = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: var(--space-xl);
	margin-top: var(--space-lg);
`

const HeroCTA = styled.a`
	display: inline-block;
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

const NowLink = styled.a`
	font-size: 0.9rem;
	color: var(--color-text-muted);
	text-decoration: none;
	transition: color var(--transition-fast);

	&:hover {
		color: var(--color-accent);
	}
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

const ExpLink = styled.a`
	color: var(--color-text-muted);
	text-decoration: none;
	font-size: 0.75rem;
	margin-left: var(--space-xs);
	opacity: 0.7;

	&:hover {
		opacity: 1;
	}
`

const ExpType = styled.div`
	font-size: 0.8125rem;
	color: var(--color-text-muted);
`

const ExpDesc = styled.p`
	margin-top: var(--space-xs);
	font-size: 0.9rem;
`

const ShowMoreBtn = styled.button`
	background: none;
	border: none;
	padding: 0;
	margin-top: var(--space-lg);
	font-size: 0.875rem;
	color: var(--color-text-muted);
	cursor: pointer;
	text-decoration: underline;
	text-underline-offset: 3px;

	&:hover {
		color: var(--color-text);
	}
`

/* ─── Skills ─────────────────────────────────────────────────── */
const SkillsGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: var(--space-lg);

	@media (min-width: 640px) {
		grid-template-columns: repeat(2, 1fr);
	}
`

const SkillCard = styled.div`
	background: var(--color-surface);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	padding: var(--space-lg);
`

const SkillCardTitle = styled.h3`
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
	flex-wrap: wrap;
	gap: var(--space-sm);
	font-size: 0.9rem;
`

/* ─── Education ──────────────────────────────────────────────── */

const EduList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: var(--space-md);
	font-size: 0.9rem;
`

const EduItem = styled.li`
	display: flex;
	align-items: center;
	gap: var(--space-md);
`

const EduLogo = styled.img`
	width: 40px;
	height: 40px;
	object-fit: contain;
	flex-shrink: 0;
`

const EduBody = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2px;
`

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

/* ─── Languages ──────────────────────────────────────────────── */
const LangList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: var(--space-sm);
`

const LangItem = styled.li`
	display: flex;
	align-items: center;
	gap: var(--space-sm);
	font-size: 0.9rem;
`

const LangName = styled.span``

const LangLevel = styled.span`
	font-size: 0.75rem;
	color: var(--color-text-muted);
	background: var(--color-border);
	padding: 2px 6px;
	border-radius: 4px;
`

/* ─── Courses ────────────────────────────────────────────────── */
const CourseList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: var(--space-sm);
`

const CourseItem = styled.li`
	display: flex;
	align-items: baseline;
	gap: var(--space-sm);
	font-size: 0.9rem;
`

const CourseYear = styled.span`
	font-size: 0.8125rem;
	color: var(--color-text-muted);
	white-space: nowrap;
	min-width: 2.5rem;
`

/* ─── FAQ ────────────────────────────────────────────────────── */
const FaqList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: var(--space-sm);
`

const FaqItem = styled.li`
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	overflow: hidden;

	details > summary {
		padding: var(--space-md) var(--space-lg);
		cursor: pointer;
		font-weight: 600;
		font-size: 0.95rem;
		list-style: none;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: var(--color-surface);
		transition: background var(--transition-fast);

		&::-webkit-details-marker {
			display: none;
		}

		&::after {
			content: '+';
			font-size: 1.25rem;
			font-weight: 400;
			color: var(--color-text-muted);
			flex-shrink: 0;
		}
	}

	details[open] > summary {
		border-bottom: 1px solid var(--color-border);

		&::after {
			content: '−';
		}
	}
`

const FaqAnswer = styled.p`
	padding: var(--space-md) var(--space-lg);
	margin: 0;
	font-size: 0.9rem;
	color: var(--color-text);
	line-height: 1.6;
	background: var(--color-surface);

	a {
		color: var(--color-accent);
		text-decoration: none;
		transition: opacity var(--transition-fast);

		&:visited {
			color: var(--color-accent);
		}

		&:hover {
			opacity: 0.8;
		}
	}
`

/* ─── Data ───────────────────────────────────────────────────── */
type Experience = {
	key: string
	period: string
	company: string
	role: string
	type: string
	url: string | string[] | null
	hidden?: boolean
}

const experiences: Experience[] = [
	{
		key: 'vocalls',
		period: '02/2025–dosud',
		company: 'Vocalls (Callminer)',
		role: 'QA Engineer',
		type: 'full-time contractor',
		url: 'https://callminer.com',
	},
	{
		key: 'faktura',
		period: '03/2023–03/2025',
		company: 'FakturaOnline.cz',
		role: 'QA Engineer',
		type: 'part-time contractor',
		url: 'https://www.fakturaonline.cz',
	},
	{
		key: 'alfa',
		period: '04/2023–02/2026',
		company: 'Alfa Industries s.r.o.',
		role: 'Frontend Developer',
		type: 'part-time contractor',
		url: [
			'https://digientities.web.app',
			'https://hyperprostor.cz',
			'https://magic-diary-ai.web.app',
			'https://ai-content-optimizer.web.app',
		],
	},
	{
		key: 'matchhype',
		period: '05/2023–12/2024',
		company: 'Matchhype.com',
		role: 'Frontend Developer',
		type: 'full-time contractor',
		url: 'https://matchhype.com',
	},
	{
		key: 'iguana',
		period: '12/2021–05/2024',
		company: 'Iguana Technology',
		role: 'QA Engineer',
		type: 'full-time/part-time contractor',
		url: ['https://www.campiri.com/cs-cz', 'https://www.dokempu.cz'],
	},
	{
		key: 'motionlab',
		period: '06/2021–07/2022',
		company: 'Motionlab.io',
		role: 'Frontend Developer',
		type: 'full-time contractor',
		url: 'https://motionlab.io',
	},
	{
		key: 'czechinvest',
		period: '06/2007–03/2021',
		company: 'CzechInvest',
		role: 'Grafický designér / Webmaster',
		type: 'full-time',
		url: 'https://www.czechinvest.org',
		hidden: true,
	},
	{
		key: 'kasten',
		period: '2018',
		company: 'Kasten s.r.o.',
		role: 'Marketing assistant, copywriter',
		type: 'part-time',
		url: null,
		hidden: true,
	},
	{
		key: 'grada',
		period: '02/2022–12/2022',
		company: 'Grada',
		role: 'Epub creator',
		type: 'part-time contractor',
		url: 'https://www.grada.cz',
		hidden: true,
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
			{label: 'Locust', icon: '/icons/locust.svg'},
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
		],
	},
	{
		titleKey: 'skills.devops',
		items: [
			{label: 'GitHub', icon: '/icons/github.svg'},
			{label: 'GitLab', icon: '/icons/gitlab.svg'},
			{label: 'GitHub Actions', icon: '/icons/githubactions.svg'},
			{label: 'CircleCI', icon: '/icons/circleci.svg'},
			{label: 'Docker', icon: '/icons/docker.svg'},
			{label: 'Postman', icon: '/icons/postman.svg'},
			{label: 'Insomnia', icon: '/icons/insomnia.svg'},
			{label: 'Qase', icon: '/icons/qase.svg'},
			{label: 'TestRail', icon: '/icons/testrail.svg'},
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
		logo: '/icons/Charles-University-symbol-4.svg',
	},
	{
		school: 'Výtvarná škola Václava Hollara',
		fieldKey: 'education.field.graphic',
		degree: 'Maturita',
		logo: '/icons/hollarka.svg',
	},
]

const languageCodes = [
	{code: 'en', level: 'B2', flag: '🇬🇧'},
	{code: 'es', level: 'A2', flag: '🇪🇸'},
	{code: 'de', level: 'A1', flag: '🇩🇪'},
]

const courses = [
	{key: 'devops', year: '2025', url: null},
	{key: 'webperf', year: '2023', url: null},
	{key: 'kitner', year: '2021', url: null},
	{key: 'czechitas-web', year: '2021', url: 'https://jaknafrontend.cz'},
	{key: 'czechitas-testing', year: '2021', url: null},
	{key: 'czechitas-auto', year: '2021', url: null},
	{key: 'czechitas-koderk\u0430', year: '2020', url: null},
	{key: 'czechitas-data', year: '2021', url: null},
	{key: 'czechitas-python', year: '2021', url: null},
	{key: 'google-ux', year: '2021', url: null},
	{key: 'google-support', year: '2021', url: null},
	{key: 'rpa', year: '2021', url: null},
	{key: 'holky', year: '2020', url: null},
]

const hasHiddenExperiences = experiences.some((e) => e.hidden)

const Home = () => {
	const {t} = useTranslation()
	const {lang} = useLanguage()
	const [showAll, setShowAll] = useState(false)
	const displayNames = new Intl.DisplayNames([LOCALE_MAP[lang] ?? 'en-US'], {
		type: 'language',
	})
	const visibleExperiences = experiences.filter((e) => showAll || !e.hidden)
	return (
		<>
			<SEO page="home" />
			<Hero id="about">
				<HeroEyebrow>{t('hi')}</HeroEyebrow>
				<HeroTagline>
					{t('about.tagline.line1')}
					<br />
					<span>{t('about.tagline.line2a')}</span>{' '}
					{t('about.tagline.line2b')}
				</HeroTagline>
				<HeroMeta>
					<strong>{t('about.subtitle')}</strong>
				</HeroMeta>
				<HeroActions>
					<HeroCTA href="/contact">{t('hero.cta')}</HeroCTA>
					<NowLink href="/now">{t('now.link')}</NowLink>
				</HeroActions>
			</Hero>
			<Section id="experience">
				<SectionTitle>{t('nav.experience')}</SectionTitle>
				<ExperienceList>
					{visibleExperiences.map(
						({key, period, company, role, type, url}) => (
							<ExperienceItem key={key}>
								<ExpPeriod>{period}</ExpPeriod>
								<ExpBody>
									<ExpRole>{role}</ExpRole>
									<ExpCompany>
										{company}
										{url &&
											(Array.isArray(url)
												? url
												: [url]
											).map((u, i) => (
												<ExpLink
													key={i}
													href={u}
													target="_blank"
													rel="noopener noreferrer"
												>
													↗
												</ExpLink>
											))}
									</ExpCompany>
									<ExpType>{type}</ExpType>
									{t(`experience.${key}.desc`) && (
										<ExpDesc>
											{t(`experience.${key}.desc`)}
										</ExpDesc>
									)}
								</ExpBody>
							</ExperienceItem>
						)
					)}
				</ExperienceList>
				{hasHiddenExperiences && (
					<ShowMoreBtn onClick={() => setShowAll((v) => !v)}>
						{showAll
							? t('experience.hide')
							: t('experience.showAll')}
					</ShowMoreBtn>
				)}
			</Section>
			<Section id="skills">
				<SectionTitle>{t('nav.skills')}</SectionTitle>
				<SkillsGrid>
					{skillGroups.map(({titleKey, items}) => (
						<SkillCard key={titleKey}>
							<SkillCardTitle>{t(titleKey)}</SkillCardTitle>
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
											width={18}
											height={18}
											style={{
												objectFit: 'contain',
												flexShrink: 0,
											}}
										/>
										<span>{item.label}</span>
									</li>
								))}
							</SkillList>
						</SkillCard>
					))}
				</SkillsGrid>
			</Section>
			<Section id="courses">
				<SectionTitle>{t('courses.title')}</SectionTitle>
				<CourseList>
					{courses.map(({key, year, url}) => (
						<CourseItem key={key}>
							<CourseYear>{year}</CourseYear>
							{url ? (
								<a
									href={url}
									target="_blank"
									rel="noopener noreferrer"
									style={{color: 'inherit'}}
								>
									{t(`course.${key}`)}
								</a>
							) : (
								<span>{t(`course.${key}`)}</span>
							)}
						</CourseItem>
					))}
				</CourseList>
			</Section>
			<Section id="languages">
				<SectionTitle>{t('education.languages')}</SectionTitle>
				<LangList>
					{languageCodes.map(({code, level, flag}) => (
						<LangItem key={code}>
							<span
								style={{fontSize: '1.25rem'}}
								aria-hidden="true"
							>
								{flag}
							</span>
							<LangName>{displayNames.of(code)}</LangName>
							<LangLevel>{level}</LangLevel>
						</LangItem>
					))}
				</LangList>
			</Section>
			<Section id="education">
				<SectionTitle>{t('nav.education')}</SectionTitle>
				<EduList>
					{education.map(({school, fieldKey, degree, logo}) => (
						<EduItem key={school}>
							{logo && <EduLogo src={logo} alt={school} />}
							<EduBody>
								<EduSchool>{school}</EduSchool>
								<EduField>{t(fieldKey)}</EduField>
								<EduDegree>{degree}</EduDegree>
							</EduBody>
						</EduItem>
					))}
				</EduList>
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
			<Section id="faq">
				<SectionTitle>{t('faq.title')}</SectionTitle>
				<FaqList>
					{[
						{q: t('faq.q0'), a: t('faq.a0')},
						{q: t('faq.q4'), a: t('faq.a4')},
						{
							q: t('faq.q1'),
							a: t('faq.a1'),
							linkHref: '/#skills',
							linkLabel: t('faq.a1.link'),
						},
						{
							q: t('faq.q2'),
							a: t('faq.a2'),
							linkHref: '/contact',
							linkLabel: t('faq.a2.link'),
						},
						{q: t('faq.q3'), a: t('faq.a3')},
					].map(({q, a, linkHref, linkLabel}) => (
						<FaqItem key={q}>
							<details>
								<summary>{q}</summary>
								<FaqAnswer>
									{a}
									{linkHref && linkLabel && (
										<>
											{' '}
											<a href={linkHref}>{linkLabel}</a>
										</>
									)}
								</FaqAnswer>
							</details>
						</FaqItem>
					))}
				</FaqList>
			</Section>
			<Section id="contact">
				<SectionTitle>{t('contact.heading')}</SectionTitle>
				<ContactForm />
			</Section>
		</>
	)
}

export default Home
