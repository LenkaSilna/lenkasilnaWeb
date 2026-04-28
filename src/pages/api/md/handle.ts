import type {NextApiRequest, NextApiResponse} from 'next'
import en from '../../../../messages/en.json'
import cs from '../../../../messages/cs.json'
import de from '../../../../messages/de.json'
import es from '../../../../messages/es.json'
import {experiences} from '../../../components/home/homeData'

type Messages = Record<string, string>

const messagesMap: Record<string, Messages> = {en, cs, de, es}

function homeMarkdown(t: Messages): string {
	const visibleExperiences = experiences.filter((e) => !e.hidden)
	const expLines = visibleExperiences
		.map((e) => {
			const role = t[`experience.${e.key}.role`] ?? ''
			const period = t[`experience.${e.key}.period`] ?? ''
			const desc = t[`experience.${e.key}.desc`] ?? ''
			return `### ${role} — ${e.company} (${period})\n${desc}`
		})
		.join('\n\n')

	return `# ${t['hi']}

${t['about.subtitle']}

${t['about.intro']}

> ${t['about.tagline']}

## ${t['nav.experience']}

${expLines}

## ${t['nav.skills']}

**${t['skills.testing']}:** Playwright, Cypress, TestCafe, Cucumber, Locust, SQL

**${t['skills.development']}:** React, Next.js, TypeScript, JavaScript, Styled Components, SCSS, Node.js

**${t['skills.devops']}:** GitHub, GitLab, GitHub Actions, CircleCI, Docker, Postman, Insomnia, Qase, TestRail

**${t['skills.design']}:** Figma, Adobe CC, Affinity

## ${t['nav.education']}

- Charles University in Prague — ${t['education.field.arts']}, ${t['education.degree.bc']}
- Vaclav Hollar Art School — ${t['education.field.graphic']}, ${t['education.degree.maturita']}

## ${t['nav.contact']}

Web: https://www.lenkasilna.cz
Email: lenka.barica@gmail.com
`
}

function nowMarkdown(t: Messages): string {
	return `# ${t['now.title']}

_${t['now.updated']}_

## ${t['now.work']}
${t['now.work.desc']}

## ${t['now.learning']}
${t['now.learning.desc']}

## ${t['now.reading']}
${t['now.reading.desc']}

## ${t['now.available']}
${t['now.available.desc']}

---

Web: https://www.lenkasilna.cz
Email: lenka.barica@gmail.com
`
}

function contactMarkdown(t: Messages): string {
	return `# ${t['contact.heading']}

${t['contact.intro']}

Email: lenka.barica@gmail.com
Web: https://www.lenkasilna.cz
`
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const page = (req.headers['x-md-page'] as string) ?? 'home'
	const locale = (req.headers['x-md-locale'] as string) ?? 'en'
	const t: Messages = messagesMap[locale] ?? messagesMap['en']

	let content: string
	if (page === 'now') {
		content = nowMarkdown(t)
	} else if (page === 'contact') {
		content = contactMarkdown(t)
	} else {
		content = homeMarkdown(t)
	}

	res.setHeader('Content-Type', 'text/markdown; charset=utf-8')
	res.setHeader('Vary', 'Accept')
	res.setHeader('Cache-Control', 'no-store')
	res.status(200).send(content)
}
