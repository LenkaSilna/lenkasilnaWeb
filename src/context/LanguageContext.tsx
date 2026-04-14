import {useState, useEffect, ReactNode} from 'react'
import {LocalizationLanguages} from '../types/enums'
import {LanguageContext} from './language-context'

export const LanguageProvider = ({children}: {children: ReactNode}) => {
	// Start with 'en' to match SSR — localStorage is read after hydration
	const [lang, setLang] = useState<LocalizationLanguages>(
		LocalizationLanguages.en
	)

	useEffect(() => {
		const savedLang = localStorage.getItem(
			'website-language'
		) as LocalizationLanguages | null
		// eslint-disable-next-line react-hooks/set-state-in-effect
		if (savedLang) setLang(savedLang)
	}, [])

	useEffect(() => {
		localStorage.setItem('website-language', lang)
		document.documentElement.lang = lang
	}, [lang])

	return (
		<LanguageContext.Provider value={{lang, setLang}}>
			{children}
		</LanguageContext.Provider>
	)
}
