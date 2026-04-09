import React, {useState, useEffect, useRef} from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import {useLanguage} from '../context/LanguageContext'
import {useTheme} from '../context/ThemeContext'
import {LocalizationLanguages} from '../types/enums'

/* ─── Types ─────────────────────────────────────────────────── */
export interface NavItem {
	href: string
	label: string
}

/* ─── Styled components ─────────────────────────────────────── */
const Wrapper = styled.nav.withConfig({
	shouldForwardProp: (prop) => prop !== '$visible',
})<{$visible: boolean}>`
	position: sticky;
	top: 0;
	z-index: 200;
	width: 100%;
	background: var(--color-bg);
	box-shadow: var(--nav-shadow);
	transform: translateY(${({$visible}) => ($visible ? '0' : '-100%')});
	transition: transform var(--transition-base);
`

const TopRow = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	height: var(--nav-height);
	padding: 0 var(--space-md);
`

const Title = styled.span`
	font-size: 1rem;
	font-weight: 600;
`

const Actions = styled.div`
	display: flex;
	align-items: center;
	gap: var(--space-md);
`

/* Desktop-only nav links */
const DesktopLinks = styled.div`
	display: none;
	gap: var(--space-lg);

	@media (min-width: 768px) {
		display: flex;
	}
`

const NavAnchor = styled(Link)`
	font-size: 0.875rem;
	color: var(--color-text-muted);
	text-decoration: none;
	transition: color var(--transition-fast);

	&:hover,
	&:focus-visible {
		color: var(--color-text);
	}
`

/* Desktop-only language switcher */
const DesktopLang = styled.div`
	display: none;
	gap: var(--space-md);

	@media (min-width: 768px) {
		display: flex;
		align-items: center;
	}
`

const LangBtn = styled.button.withConfig({
	shouldForwardProp: (prop) => prop !== '$isActive',
})<{$isActive: boolean}>`
	background: none;
	border: none;
	padding: var(--space-xs) 0;
	cursor: pointer;
	font-size: 0.8125rem;
	font-weight: ${({$isActive}) => ($isActive ? '700' : '400')};
	color: ${({$isActive}) =>
		$isActive ? 'var(--color-text)' : 'var(--color-text-muted)'};
	border-bottom: 2px solid
		${({$isActive}) => ($isActive ? 'var(--color-text)' : 'transparent')};
	transition:
		color var(--transition-fast),
		border-color var(--transition-fast);

	&:hover {
		color: var(--color-text);
	}

	&:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 3px;
		border-radius: var(--radius-sm);
	}
`

/* Theme toggle */
const ThemeBtn = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	font-size: 1.1rem;
	line-height: 1;
	padding: var(--space-xs);
	color: var(--color-text-muted);
	transition: color var(--transition-fast);

	&:hover {
		color: var(--color-text);
	}

	&:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
		border-radius: var(--radius-sm);
	}
`

/* Hamburger — mobile only */
const HamburgerBtn = styled.button.withConfig({
	shouldForwardProp: (prop) => prop !== '$isOpen',
})<{$isOpen: boolean}>`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 22px;
	height: 16px;
	background: none;
	border: none;
	cursor: pointer;
	padding: 0;
	color: inherit;

	@media (min-width: 768px) {
		display: none;
	}

	&:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 4px;
		border-radius: 2px;
	}
`

const Line = styled.span.withConfig({
	shouldForwardProp: (prop) => !['$pos', '$isOpen'].includes(prop),
})<{$pos: 'top' | 'mid' | 'bot'; $isOpen: boolean}>`
	display: block;
	width: 100%;
	height: 2px;
	background: currentColor;
	transition:
		transform var(--transition-base),
		opacity var(--transition-base);
	transform-origin: center;

	${({$pos, $isOpen}) =>
		$pos === 'top' &&
		$isOpen &&
		'transform: translateY(7px) rotate(45deg);'}
	${({$pos, $isOpen}) =>
		$pos === 'mid' && $isOpen && 'opacity: 0; transform: scaleX(0);'}
	${({$pos, $isOpen}) =>
		$pos === 'bot' &&
		$isOpen &&
		'transform: translateY(-7px) rotate(-45deg);'}
`

/* Mobile panel — grid trick for smooth expand */
const MobilePanel = styled.div.withConfig({
	shouldForwardProp: (prop) => prop !== '$isOpen',
})<{$isOpen: boolean}>`
	display: grid;
	grid-template-rows: ${({$isOpen}) => ($isOpen ? '1fr' : '0fr')};
	transition: grid-template-rows var(--transition-base);

	@media (min-width: 768px) {
		display: none;
	}
`

const PanelInner = styled.div`
	overflow: hidden;
`

const PanelContent = styled.div`
	padding: var(--space-md);
	border-top: 1px solid var(--color-border);
	display: flex;
	flex-direction: column;
	gap: var(--space-lg);
`

const SectionLabel = styled.span`
	font-size: 0.6875rem;
	font-weight: 600;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: var(--color-text-muted);
	display: block;
	margin-bottom: var(--space-sm);
`

const MobileLangGroup = styled.div`
	display: flex;
	gap: var(--space-md);
`

const MobileNavLinks = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--space-sm);
`

const MobileNavAnchor = styled(Link)`
	font-size: 1rem;
	font-weight: 500;
	color: var(--color-text);
	text-decoration: none;
	padding: var(--space-xs) 0;
	transition: color var(--transition-fast);

	&:hover {
		color: var(--color-accent);
	}
`

/* ─── Constants ─────────────────────────────────────────────── */
const LANGS: {code: LocalizationLanguages; label: string; fullName: string}[] =
	[
		{code: LocalizationLanguages.cs, label: 'CZ', fullName: 'Čeština'},
		{code: LocalizationLanguages.en, label: 'EN', fullName: 'English'},
		{code: LocalizationLanguages.de, label: 'DE', fullName: 'Deutsch'},
		{code: LocalizationLanguages.esp, label: 'ES', fullName: 'Español'},
	]

/* ─── Component ─────────────────────────────────────────────── */
interface NavBarProps {
	title?: string
	links?: NavItem[]
}

const NavBar: React.FC<NavBarProps> = ({title, links = []}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [visible, setVisible] = useState(true)
	const lastScrollY = useRef(0)
	const {lang, setLang} = useLanguage()
	const {theme, toggleTheme} = useTheme()
	const wrapperRef = useRef<HTMLElement>(null)
	const hamburgerRef = useRef<HTMLButtonElement>(null)

	const close = () => setIsOpen(false)

	useEffect(() => {
		const onScroll = () => {
			const currentY = window.scrollY
			if (currentY <= 10) {
				setVisible(true)
			} else if (currentY - lastScrollY.current > 4) {
				setVisible(false)
			} else if (lastScrollY.current - currentY > 4) {
				setVisible(true)
			}
			lastScrollY.current = currentY
		}
		window.addEventListener('scroll', onScroll, {passive: true})
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	useEffect(() => {
		if (!isOpen) return
		const onClickOutside = (e: MouseEvent) => {
			if (!wrapperRef.current?.contains(e.target as Node)) close()
		}
		document.addEventListener('mousedown', onClickOutside)
		return () => document.removeEventListener('mousedown', onClickOutside)
	}, [isOpen])

	useEffect(() => {
		if (!isOpen) return
		const onEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				close()
				hamburgerRef.current?.focus()
			}
		}
		document.addEventListener('keydown', onEsc)
		return () => document.removeEventListener('keydown', onEsc)
	}, [isOpen])

	const langButtons = LANGS.map(({code, label, fullName}) => (
		<LangBtn
			key={code}
			$isActive={lang === code}
			onClick={() => {
				setLang(code)
				close()
			}}
			aria-pressed={lang === code}
			aria-label={fullName}
			lang={code === LocalizationLanguages.esp ? 'es' : code}
		>
			{label}
		</LangBtn>
	))

	return (
		<Wrapper
			ref={wrapperRef}
			$visible={visible}
			aria-label="Main navigation"
		>
			<TopRow>
				{title && <Title>{title}</Title>}

				<Actions>
					{links.length > 0 && (
						<DesktopLinks>
							{links.map(({href, label}) => (
								<NavAnchor key={href} href={href}>
									{label}
								</NavAnchor>
							))}
						</DesktopLinks>
					)}

					<DesktopLang role="group" aria-label="Language selection">
						{langButtons}
					</DesktopLang>

					<ThemeBtn
						onClick={toggleTheme}
						aria-label={
							theme === 'light'
								? 'Switch to dark mode'
								: 'Switch to light mode'
						}
					>
						{theme === 'light' ? '☾' : '☀'}
					</ThemeBtn>

					<HamburgerBtn
						ref={hamburgerRef}
						$isOpen={isOpen}
						onClick={() => setIsOpen((v) => !v)}
						aria-expanded={isOpen}
						aria-controls="mobile-menu"
						aria-label={isOpen ? 'Close menu' : 'Open menu'}
					>
						<Line $pos="top" $isOpen={isOpen} />
						<Line $pos="mid" $isOpen={isOpen} />
						<Line $pos="bot" $isOpen={isOpen} />
					</HamburgerBtn>
				</Actions>
			</TopRow>

			<MobilePanel
				id="mobile-menu"
				$isOpen={isOpen}
				aria-hidden={!isOpen}
			>
				<PanelInner>
					<PanelContent>
						<div>
							<SectionLabel>Language</SectionLabel>
							<MobileLangGroup
								role="group"
								aria-label="Language selection"
							>
								{langButtons}
							</MobileLangGroup>
						</div>

						{links.length > 0 && (
							<div>
								<SectionLabel>Navigation</SectionLabel>
								<MobileNavLinks>
									{links.map(({href, label}) => (
										<MobileNavAnchor
											key={href}
											href={href}
											onClick={close}
										>
											{label}
										</MobileNavAnchor>
									))}
								</MobileNavLinks>
							</div>
						)}
					</PanelContent>
				</PanelInner>
			</MobilePanel>
		</Wrapper>
	)
}

export default NavBar
