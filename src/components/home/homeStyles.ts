import styled from 'styled-components'

export const Section = styled.section`
	padding: var(--space-xl) 0;
	scroll-margin-top: var(--nav-height);

	& + & {
		border-top: 1px solid var(--color-border);
	}
`

export const Hero = styled(Section)`
	padding: calc(var(--space-xl) * 2.5) 0 calc(var(--space-xl) * 2);
	max-width: 680px;
`

export const SectionTitle = styled.h2`
	margin-bottom: var(--space-lg);
`

export const HeroEyebrow = styled.p`
	font-size: 0.8125rem;
	font-weight: 500;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: var(--color-accent);
	margin-bottom: var(--space-md);
`

export const HeroTagline = styled.h1`
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

export const HeroMeta = styled.p`
	font-size: 0.9375rem;
	color: var(--color-text-muted);
	margin: 0;
	line-height: 1.6;

	strong {
		color: var(--color-text);
		font-weight: 500;
	}
`

export const HeroActions = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: var(--space-xl);
	margin-top: var(--space-lg);
`

export const HeroCTA = styled.a`
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

export const NowLink = styled.a`
	font-size: 0.9rem;
	color: var(--color-text-muted);
	text-decoration: none;
	transition: color var(--transition-fast);

	&:hover {
		color: var(--color-accent);
	}
`

export const ExperienceList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: var(--space-lg);
`

export const ExperienceItem = styled.li`
	display: grid;
	grid-template-columns: 1fr;
	gap: var(--space-xs);

	@media (min-width: 640px) {
		grid-template-columns: 180px 1fr;
		gap: var(--space-md);
	}
`

export const ExpPeriod = styled.span`
	font-size: 0.8125rem;
	color: var(--color-text-muted);
	white-space: nowrap;
`

export const ExpBody = styled.div``

export const ExpRole = styled.div`
	font-weight: 600;
`

export const ExpCompany = styled.div`
	color: var(--color-text-muted);
	font-size: 0.9rem;
`

export const ExpLink = styled.a`
	color: var(--color-text-muted);
	text-decoration: none;
	font-size: 0.75rem;
	margin-left: var(--space-xs);
	opacity: 0.7;

	&:hover {
		opacity: 1;
	}
`

export const ExpType = styled.div`
	font-size: 0.8125rem;
	color: var(--color-text-muted);
`

export const ExpDesc = styled.p`
	margin-top: var(--space-xs);
	font-size: 0.9rem;
`

export const ShowMoreBtn = styled.button`
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

export const SkillsGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: var(--space-lg);

	@media (min-width: 640px) {
		grid-template-columns: repeat(2, 1fr);
	}
`

export const SkillCard = styled.div`
	background: var(--color-surface);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	padding: var(--space-lg);
`

export const SkillCardTitle = styled.h3`
	font-size: 0.875rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	color: var(--color-text-muted);
	margin-bottom: var(--space-sm);
`

export const SkillList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-wrap: wrap;
	gap: var(--space-sm);
	font-size: 0.9rem;
`

export const SkillItem = styled.li`
	display: flex;
	align-items: center;
	gap: var(--space-sm);
`

export const SkillIcon = styled.img`
	width: 18px;
	height: 18px;
	object-fit: contain;
	flex-shrink: 0;
`

export const EduList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: var(--space-md);
	font-size: 0.9rem;
`

export const EduItem = styled.li`
	display: flex;
	align-items: center;
	gap: var(--space-md);
`

export const EduLogo = styled.img`
	width: 40px;
	height: 40px;
	object-fit: contain;
	flex-shrink: 0;
`

export const EduBody = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2px;
`

export const EduSchool = styled.div`
	font-weight: 600;
`

export const EduField = styled.div`
	color: var(--color-text-muted);
`

export const EduDegree = styled.div`
	font-size: 0.8125rem;
	color: var(--color-text-muted);
`

export const LangList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: var(--space-sm);
`

export const LangItem = styled.li`
	display: flex;
	align-items: center;
	gap: var(--space-sm);
	font-size: 0.9rem;
`

export const LangFlag = styled.span`
	font-size: 1.25rem;
`

export const LangName = styled.span``

export const LangLevel = styled.span`
	font-size: 0.75rem;
	color: var(--color-text-muted);
	background: var(--color-border);
	padding: 2px 6px;
	border-radius: 4px;
`

export const CourseList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: var(--space-sm);
`

export const CourseItem = styled.li`
	display: flex;
	align-items: baseline;
	gap: var(--space-sm);
	font-size: 0.9rem;
`

export const CourseYear = styled.span`
	font-size: 0.8125rem;
	color: var(--color-text-muted);
	white-space: nowrap;
	min-width: 2.5rem;
`

export const CourseLink = styled.a`
	color: inherit;
`

export const PodcastGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: var(--space-md);
`

export const PodcastEmbed = styled.iframe`
	border: 0;
	border-radius: 12px;
`

export const SpeakingLink = styled.a`
	display: flex;
	align-items: center;
	gap: var(--space-md);
	text-decoration: none;
	color: inherit;
`

export const SpeakingIcon = styled.img`
	width: 32px;
	height: 32px;
	flex-shrink: 0;
`

export const SpeakingTitle = styled.div`
	font-weight: 600;
`

export const SpeakingMeta = styled.div`
	font-size: 0.875rem;
	color: var(--color-text-muted);
`

export const SpeakingDesc = styled.div`
	font-size: 0.875rem;
	margin-top: var(--space-xs);
`

export const FaqList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: var(--space-sm);
`

export const FaqItem = styled.li`
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

export const FaqAnswer = styled.p`
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
