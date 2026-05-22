import * as Sentry from '@sentry/nextjs'
import type {NextPageContext} from 'next'
import Error from 'next/error'

type ErrorProps = {statusCode: number}

const CustomErrorComponent = (props: ErrorProps) => {
	return <Error statusCode={props.statusCode} />
}

CustomErrorComponent.getInitialProps = async (contextData: NextPageContext) => {
	await Sentry.captureUnderscoreErrorException(contextData)
	return Error.getInitialProps(contextData)
}

export default CustomErrorComponent
