import styled from 'styled-components'

const Badge = styled.div`
	position: fixed;
	bottom: 0.75rem;
	right: 0.75rem;
	font-size: 0.6875rem;
	color: #888;
	background: rgba(0, 0, 0, 0.04);
	padding: 0.2rem 0.5rem;
	border-radius: 4px;
	pointer-events: none;
	user-select: none;
	z-index: 100;
`

const VersionBadge = () => (
	<Badge aria-hidden="true">v{process.env.NEXT_PUBLIC_APP_VERSION}</Badge>
)

export default VersionBadge
