export type Experience = {
	key: string
	company: string
	url: string | string[] | null
	hidden?: boolean
}

export const LOCALE_MAP: Record<string, string> = {
	cs: 'cs-CZ',
	en: 'en-US',
	de: 'de-DE',
	es: 'es-ES',
}

export const experiences: Experience[] = [
	{
		key: 'vocalls',
		company: 'Vocalls (Callminer)',
		url: 'https://callminer.com',
	},
	{
		key: 'faktura',
		company: 'FakturaOnline.cz',
		url: 'https://www.fakturaonline.cz',
	},
	{
		key: 'alfa',
		company: 'Alfa Industries s.r.o.',
		url: [
			'https://digientities.web.app',
			'https://hyperprostor.cz',
			'https://magic-diary-ai.web.app',
			'https://ai-content-optimizer.web.app',
		],
	},
	{
		key: 'matchhype',
		company: 'Matchhype.com',
		url: 'https://matchhype.com',
	},
	{
		key: 'iguana',
		company: 'Iguana Technology',
		url: ['https://www.campiri.com/cs-cz', 'https://www.dokempu.cz'],
	},
	{
		key: 'motionlab',
		company: 'Motionlab.io',
		url: 'https://motionlab.io',
	},
	{
		key: 'czechinvest',
		company: 'CzechInvest',
		url: 'https://www.czechinvest.org',
		hidden: true,
	},
	{
		key: 'kasten',
		company: 'Kasten s.r.o.',
		url: null,
		hidden: true,
	},
	{
		key: 'grada',
		company: 'Grada',
		url: 'https://www.grada.cz',
		hidden: true,
	},
]

export const skillGroups = [
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

export const education = [
	{
		schoolKey: 'education.school.charles',
		fieldKey: 'education.field.arts',
		degreeKey: 'education.degree.bc',
		logo: '/icons/Charles-University-symbol-4.svg',
	},
	{
		schoolKey: 'education.school.hollar',
		fieldKey: 'education.field.graphic',
		degreeKey: 'education.degree.maturita',
		logo: '/icons/hollarka.svg',
	},
]

export const languageCodes = [
	{code: 'en', level: 'B2', flag: '🇬🇧'},
	{code: 'es', level: 'A2', flag: '🇪🇸'},
	{code: 'de', level: 'A1', flag: '🇩🇪'},
]

export const courses = [
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

export const hasHiddenExperiences = experiences.some(
	(experience) => experience.hidden
)
