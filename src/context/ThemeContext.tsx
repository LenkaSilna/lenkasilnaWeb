import {useState, useEffect, useRef, ReactNode} from 'react'
import {ThemeContext, Theme} from './theme-context'

const resolveTheme = (): Theme => {
	if (typeof window === 'undefined') return 'light'
	const saved = localStorage.getItem('theme') as Theme | null
	if (saved === 'light' || saved === 'dark') return saved
	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light'
}

const applyTheme = (t: Theme) => {
	document.documentElement.setAttribute('data-theme', t)
	localStorage.setItem('theme', t)
}

export const ThemeProvider = ({children}: {children: ReactNode}) => {
	const resolved = useRef<Theme>('light')
	const [theme, setTheme] = useState<Theme>('light')

	useEffect(() => {
		resolved.current = resolveTheme()
		applyTheme(resolved.current)
		setTheme(resolved.current)
	}, [])

	const toggleTheme = () => {
		const next: Theme = theme === 'light' ? 'dark' : 'light'
		applyTheme(next)
		setTheme(next)
	}

	return (
		<ThemeContext.Provider value={{theme, toggleTheme}}>
			{children}
		</ThemeContext.Provider>
	)
}
