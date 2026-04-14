import {useLanguage} from '../context/useLanguage'
import csMessages from '../../messages/cs.json'
import enMessages from '../../messages/en.json'
import deMessages from '../../messages/de.json'
import espMessages from '../../messages/esp.json'

const messages = {
	cs: csMessages,
	en: enMessages,
	de: deMessages,
	esp: espMessages,
}

export function useTranslation() {
	const {lang} = useLanguage()
	return {
		t: (key: string): string =>
			(messages[lang] as Record<string, string>)[key] ?? key,
	}
}
