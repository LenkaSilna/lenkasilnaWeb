import {createContext} from 'react'
import {LocalizationLanguages} from '../types/enums'

export interface LanguageContextType {
	lang: LocalizationLanguages
	setLang: (lang: LocalizationLanguages) => void
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined
)
