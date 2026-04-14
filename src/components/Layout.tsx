import React from 'react'
import styled from 'styled-components'
import {useTranslation} from '../localization'
import NavBar from './NavBar'
import VersionBadge from './VersionBadge'

interface LayoutProps {
	children: React.ReactNode
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`

const Content = styled.main`
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	padding: var(--space-lg) var(--space-md);

	@media (min-width: 768px) {
		padding: var(--space-xl) var(--space-lg);
	}
`

const Footer = styled.footer`
	width: 100%;
	padding: var(--space-md) var(--space-lg);
	font-size: 0.8rem;
	color: var(--color-text-muted);
	border-top: 1px solid var(--color-border);
	margin-top: auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: var(--space-sm);
`

const FooterLinks = styled.div`
	display: flex;
	align-items: center;
	gap: var(--space-md);
`

const FooterLink = styled.a`
	color: var(--color-text-muted);
	text-decoration: none;
	display: flex;
	align-items: center;
	gap: var(--space-xs);
	transition: color var(--transition-fast);

	&:hover {
		color: var(--color-text);
	}
`

const Layout: React.FC<LayoutProps> = ({children}) => {
	const {t} = useTranslation()

	const navLinks = [
		{href: '/#about', label: t('nav.about')},
		{href: '/#experience', label: t('nav.experience')},
		{href: '/#skills', label: t('nav.skills')},
		{href: '/#contact', label: t('nav.contact')},
	]

	return (
		<Container>
			<NavBar links={navLinks} />
			<Content>{children}</Content>
			<Footer>
				<span>
					© {new Date().getFullYear()} Lenka Silná · IČO 74243764 ·
					Fyzická osoba zapsaná v živnostenském rejstříku, Městský
					úřad Rakovník
				</span>
				<FooterLinks>
					<FooterLink
						href="https://www.linkedin.com/in/lenka-silna/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="currentColor"
							aria-hidden="true"
						>
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
						</svg>
						LinkedIn
					</FooterLink>
					<FooterLink
						href="https://github.com/LenkaSilna"
						target="_blank"
						rel="noopener noreferrer"
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="currentColor"
							aria-hidden="true"
						>
							<path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
						</svg>
						GitHub
					</FooterLink>
					<FooterLink
						href="/cv/LS-CZ-QA-2026.pdf"
						download
						aria-label="Stáhnout CV"
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true"
						>
							<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
							<polyline points="14 2 14 8 20 8" />
							<line x1="12" y1="12" x2="12" y2="18" />
							<polyline points="9 15 12 18 15 15" />
						</svg>
						CV
					</FooterLink>
				</FooterLinks>
			</Footer>
			<VersionBadge />
		</Container>
	)
}

export default Layout
