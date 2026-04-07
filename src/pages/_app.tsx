import './index.css'
import {AppProps} from 'next/app'
import {LanguageProvider} from '../context/LanguageContext'
import {ThemeProvider} from '../context/ThemeContext'
import Layout from '../components/Layout'

function MyApp({Component, pageProps}: AppProps) {
	return (
		<ThemeProvider>
			<LanguageProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</LanguageProvider>
		</ThemeProvider>
	)
}

export default MyApp
