import {useEffect, useRef, ReactNode} from 'react'
import {useRouter} from 'next/router'
import {LocalizationLanguages} from '../types/enums'
import {LanguageContext} from './language-context'

const STORAGE_KEY = 'website-language'
const DEFAULT_LOCALE = LocalizationLanguages.en

const COUNTRY_TO_LOCALE: Record<string, LocalizationLanguages> = {
	CZ: LocalizationLanguages.cs,
	SK: LocalizationLanguages.cs,
	DE: LocalizationLanguages.de,
	AT: LocalizationLanguages.de,
	CH: LocalizationLanguages.de,
	ES: LocalizationLanguages.es,
	MX: LocalizationLanguages.es,
	AR: LocalizationLanguages.es,
	CO: LocalizationLanguages.es,
	CL: LocalizationLanguages.es,
	PE: LocalizationLanguages.es,
}

export const LanguageProvider = ({children}: {children: ReactNode}) => {
	const router = useRouter()
	const redirectDone = useRef(false)

	const lang = (router.locale as LocalizationLanguages) ?? DEFAULT_LOCALE

	const setLang = (newLang: LocalizationLanguages) => {
		router.push(router.asPath, router.asPath, {locale: newLang})
	}

	useEffect(() => {
		if (!router.isReady || redirectDone.current) return

		if (router.locale !== DEFAULT_LOCALE) {
			// Non-default locale in URL → save as preference
			localStorage.setItem(STORAGE_KEY, router.locale!)
			redirectDone.current = true
			return
		}

		// On default locale: check saved preference first
		const saved = localStorage.getItem(STORAGE_KEY)
		const validLocales = Object.values(LocalizationLanguages) as string[]
		if (saved && !validLocales.includes(saved)) {
			localStorage.removeItem(STORAGE_KEY)
		} else if (saved && saved !== DEFAULT_LOCALE) {
			redirectDone.current = true
			router.replace(router.asPath, router.asPath, {
				locale: saved as LocalizationLanguages,
			})
			return
		}

		// No saved preference: try IP-based detection
		redirectDone.current = true
		fetch('https://ipapi.co/json/')
			.then((r) => r.json())
			.then((data: {country_code?: string}) => {
				const detected = COUNTRY_TO_LOCALE[data.country_code ?? '']
				if (detected && detected !== DEFAULT_LOCALE) {
					router.replace(router.asPath, router.asPath, {
						locale: detected,
					})
				}
			})
			.catch(() => {
				/* stay on default locale */
			})
	}, [router.isReady, router.locale]) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		document.documentElement.lang = lang
	}, [lang])

	return (
		<LanguageContext.Provider value={{lang, setLang}}>
			{children}
		</LanguageContext.Provider>
	)
}
