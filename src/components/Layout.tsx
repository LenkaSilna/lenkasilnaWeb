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
	padding: var(--space-md);
	text-align: center;
	font-size: 0.8rem;
	color: var(--color-text-muted);
	border-top: 1px solid var(--color-border);
	margin-top: auto;
`

const Layout: React.FC<LayoutProps> = ({children}) => {
	const {t} = useTranslation()

	const navLinks = [
		{href: '#about', label: t('nav.about')},
		{href: '#portfolio', label: t('nav.portfolio')},
		{href: '#contact', label: t('nav.contact')},
	]

	return (
		<Container>
			<NavBar links={navLinks} />
			<Content>{children}</Content>
			<Footer>
				© {new Date().getFullYear()} Lenka Silná
			</Footer>
			<VersionBadge />
		</Container>
	)
}

export default Layout
