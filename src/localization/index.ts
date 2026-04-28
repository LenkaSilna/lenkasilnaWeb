import {useLanguage} from '../context/useLanguage'
import csMessages from '../../messages/cs.json'
import enMessages from '../../messages/en.json'
import deMessages from '../../messages/de.json'
import esMessages from '../../messages/es.json'

const messages = {
	cs: csMessages,
	en: enMessages,
	de: deMessages,
	es: esMessages,
}

export function useTranslation() {
	const {lang} = useLanguage()
	return {
		t: (key: string): string =>
			(messages[lang] as Record<string, string>)[key] ?? key,
	}
}
