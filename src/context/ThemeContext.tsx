import {useState, useLayoutEffect, ReactNode} from 'react'
import {ThemeContext, Theme} from './theme-context'

const getInitialTheme = (): Theme => {
	if (typeof window === 'undefined') return 'light'
	const saved = localStorage.getItem('theme') as Theme | null
	if (saved) return saved
	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light'
}

export const ThemeProvider = ({children}: {children: ReactNode}) => {
	const [theme, setTheme] = useState<Theme>(getInitialTheme)

	useLayoutEffect(() => {
		document.documentElement.setAttribute('data-theme', theme)
		localStorage.setItem('theme', theme)
	}, [theme])

	const toggleTheme = () =>
		setTheme((t) => (t === 'light' ? 'dark' : 'light'))

	return (
		<ThemeContext.Provider value={{theme, toggleTheme}}>
			{children}
		</ThemeContext.Provider>
	)
}
