import {useState, useEffect, ReactNode} from 'react'
import {ThemeContext, Theme} from './theme-context'

export const ThemeProvider = ({children}: {children: ReactNode}) => {
	const [theme, setTheme] = useState<Theme>('light')
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		const saved = localStorage.getItem('theme') as Theme | null
		const preferred = window.matchMedia('(prefers-color-scheme: dark)')
			.matches
			? 'dark'
			: 'light'
		const resolved = saved ?? preferred
		setTheme(resolved)
		document.documentElement.setAttribute('data-theme', resolved)
		setMounted(true)
	}, [])

	useEffect(() => {
		if (!mounted) return
		document.documentElement.setAttribute('data-theme', theme)
		localStorage.setItem('theme', theme)
	}, [theme, mounted])

	const toggleTheme = () =>
		setTheme((t) => (t === 'light' ? 'dark' : 'light'))

	return (
		<ThemeContext.Provider value={{theme, toggleTheme}}>
			{children}
		</ThemeContext.Provider>
	)
}
