import {createContext, useState, useEffect, ReactNode, useContext} from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
	theme: Theme
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({children}: {children: ReactNode}) => {
	const [theme, setTheme] = useState<Theme>('light')
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		const saved = localStorage.getItem('theme') as Theme | null
		const preferred = window.matchMedia('(prefers-color-scheme: dark)')
			.matches
			? 'dark'
			: 'light'
		setTheme(saved ?? preferred)
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

export const useTheme = () => {
	const ctx = useContext(ThemeContext)
	if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
	return ctx
}
