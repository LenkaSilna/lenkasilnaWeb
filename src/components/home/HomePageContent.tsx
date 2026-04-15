import {useState} from 'react'
import BridgeBanner, {BridgeBannerSection} from '../BridgeBanner'
import ContactForm from '../ContactForm'
import {useLanguage} from '../../context/useLanguage'
import {useTranslation} from '../../localization'
import {
	courses,
	education,
	experiences,
	hasHiddenExperiences,
	languageCodes,
	LOCALE_MAP,
	skillGroups,
} from './homeData'
import {
	CourseItem,
	CourseLink,
	CourseList,
	CourseYear,
	EduBody,
	EduDegree,
	EduField,
	EduItem,
	EduList,
	EduLogo,
	EduSchool,
	ExpBody,
	ExpCompany,
	ExpDesc,
	ExperienceItem,
	ExperienceList,
	ExpLink,
	ExpPeriod,
	ExpRole,
	ExpType,
	FaqAnswer,
	FaqItem,
	FaqList,
	Hero,
	HeroActions,
	HeroCTA,
	HeroEyebrow,
	HeroMeta,
	HeroTagline,
	LangFlag,
	LangItem,
	LangLevel,
	LangList,
	LangName,
	NowLink,
	PodcastEmbed,
	PodcastGrid,
	Section,
	SectionTitle,
	ShowMoreBtn,
	SpeakingDesc,
	SpeakingIcon,
	SpeakingLink,
	SpeakingMeta,
	SpeakingTitle,
	SkillCard,
	SkillCardTitle,
	SkillIcon,
	SkillItem,
	SkillList,
	SkillsGrid,
} from './homeStyles'

const HomePageContent = () => {
	const {t} = useTranslation()
	const {lang} = useLanguage()
	const [showAll, setShowAll] = useState(false)

	const displayNames = new Intl.DisplayNames([LOCALE_MAP[lang] ?? 'en-US'], {
		type: 'language',
	})
	const visibleExperiences = experiences.filter(
		(item) => showAll || !item.hidden
	)
	const faqItems = [
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
	]

	return (
		<>
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

			<BridgeBannerSection aria-labelledby="services-bridge-title">
				<BridgeBanner
					id="services-bridge-title"
					eyebrow={t('bridge.eyebrow')}
					title={t('bridge.title')}
					text={t('bridge.text')}
					ctaLabel={t('bridge.cta')}
					href="https://sw-tester.cz"
				/>
			</BridgeBannerSection>

			<Section id="experience">
				<SectionTitle>{t('nav.experience')}</SectionTitle>
				<ExperienceList>
					{visibleExperiences.map(({key, company, url}) => (
						<ExperienceItem key={key}>
							<ExpPeriod>
								{t(`experience.${key}.period`)}
							</ExpPeriod>
							<ExpBody>
								<ExpRole>{t(`experience.${key}.role`)}</ExpRole>
								<ExpCompany>
									{company}
									{url &&
										(Array.isArray(url) ? url : [url]).map(
											(link, index) => (
												<ExpLink
													key={index}
													href={link}
													target="_blank"
													rel="noopener noreferrer"
												>
													↗
												</ExpLink>
											)
										)}
								</ExpCompany>
								<ExpType>{t(`experience.${key}.type`)}</ExpType>
								{t(`experience.${key}.desc`) && (
									<ExpDesc>
										{t(`experience.${key}.desc`)}
									</ExpDesc>
								)}
							</ExpBody>
						</ExperienceItem>
					))}
				</ExperienceList>
				{hasHiddenExperiences && (
					<ShowMoreBtn onClick={() => setShowAll((value) => !value)}>
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
									<SkillItem key={item.label}>
										<SkillIcon src={item.icon} alt="" />
										<span>{item.label}</span>
									</SkillItem>
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
								<CourseLink
									href={url}
									target="_blank"
									rel="noopener noreferrer"
								>
									{t(`course.${key}`)}
								</CourseLink>
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
							<LangFlag aria-hidden="true">{flag}</LangFlag>
							<LangName>{displayNames.of(code)}</LangName>
							<LangLevel>{level}</LangLevel>
						</LangItem>
					))}
				</LangList>
			</Section>

			<Section id="education">
				<SectionTitle>{t('nav.education')}</SectionTitle>
				<EduList>
					{education.map(({schoolKey, fieldKey, degreeKey, logo}) => (
						<EduItem key={schoolKey}>
							{logo && <EduLogo src={logo} alt={t(schoolKey)} />}
							<EduBody>
								<EduSchool>{t(schoolKey)}</EduSchool>
								<EduField>{t(fieldKey)}</EduField>
								<EduDegree>{t(degreeKey)}</EduDegree>
							</EduBody>
						</EduItem>
					))}
				</EduList>
			</Section>

			<Section id="podcast">
				<SectionTitle>{t('nav.podcast')}</SectionTitle>
				<PodcastGrid>
					<PodcastEmbed
						src="https://open.spotify.com/embed/episode/6jx2qv04B5CrShN91Alhv5?utm_source=generator"
						width="100%"
						height={152}
						allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
						loading="lazy"
					/>
					<PodcastEmbed
						src="https://open.spotify.com/embed/episode/5UdfhGbyFIfy7dGb8wySLg?utm_source=generator"
						width="100%"
						height={152}
						allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
						loading="lazy"
					/>
				</PodcastGrid>
			</Section>

			<Section id="speaking">
				<SectionTitle>{t('nav.speaking')}</SectionTitle>
				<SpeakingLink
					href="https://cz.pycon.org/2023/program/talks/78/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<SpeakingIcon src="/icons/pycon.svg" alt="PyCon" />
					<div>
						<SpeakingTitle>
							{t('speaking.pycon.title')}
						</SpeakingTitle>
						<SpeakingMeta>{t('speaking.pycon.event')}</SpeakingMeta>
						<SpeakingDesc>{t('speaking.pycon.desc')}</SpeakingDesc>
					</div>
				</SpeakingLink>
			</Section>

			<Section id="faq">
				<SectionTitle>{t('faq.title')}</SectionTitle>
				<FaqList>
					{faqItems.map(({q, a, linkHref, linkLabel}) => (
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

export default HomePageContent
