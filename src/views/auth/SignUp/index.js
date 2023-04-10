import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SignUpForm from './SignUpForm'

const p = 'signup'
const SignUp = () => {
	const { t } = useTranslation()
	const [userCreated, setUserCreated] = useState(false)
	return (
		<>
			{
				userCreated ? (
					<div className="mb-8">
						<h3 className="mb-1">{t(`${p}.confirmEmail.title`)}</h3>
						<p>{t(`${p}.confirmEmail.subtitle`)}</p>
					</div>
				) : (
					<>
						<div className="mb-8">
							<h3 className="mb-1">{t(`signup.title`)}</h3>
							<p>{t(`signup.subtitle`)}</p>
						</div>
						<SignUpForm className="mb-8" disableSubmit={false} setUserCreated={setUserCreated} />
					</>
				)
			}
		</>
	)
}

export default SignUp