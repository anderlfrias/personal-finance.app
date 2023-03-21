import React from 'react'
import { useTranslation } from 'react-i18next'
import SignUpForm from './SignUpForm'

const SignUp = () => {
	const { t } = useTranslation()
	return (
		<>
			<div className="mb-8">
				<h3 className="mb-1">{t(`signup.title`)}</h3>
				<p>{t(`signup.subtitle`)}</p>
			</div>
			<SignUpForm className="mb-8" disableSubmit={false} />
		</>
	)
}

export default SignUp