import React from 'react'
import { Input, Button, Checkbox, FormItem, FormContainer, Alert } from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from 'utils/hooks/useAuth'
import { useTranslation } from 'react-i18next'


const SignInForm = props => {
	const p = 'login.form' // This is the path to the translation file
	const { t } = useTranslation()

	const validationSchema = Yup.object().shape({
		userName: Yup.string().required(t(`${p}.username.error`)),
		password: Yup.string().required(t(`${p}.password.error`)),
		rememberMe: Yup.bool()
	})

	const {
		disableSubmit = false,
		className,
		forgotPasswordUrl = '/forgot-password',
		signUpUrl = '/sign-up'
	} = props

	const [message, setMessage] = useTimeOutMessage()

	const { signIn } = useAuth()

	const onSignIn = async (values, setSubmitting) => {
		const { userName, password } = values
		setSubmitting(true)

		const result = await signIn({ user: userName, password })

		if (result.status === 'failed') {
			setMessage(result.message)
		}

		setSubmitting(false)
	}

	return (
		<div className={className}>
			{message && <Alert className="mb-4" type="danger" showIcon>{message}</Alert>}
			<Formik
				// Remove this initial value
				initialValues={{
					userName: '',
					password: '',
					rememberMe: true
				}}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					if(!disableSubmit) {
						onSignIn(values, setSubmitting)
					} else {
						setSubmitting(false)
					}
				}}
			>
				{({touched, errors, isSubmitting}) => (
					<Form>
						<FormContainer>
							<FormItem
								label={t(`${p}.username.label`)}
								invalid={errors.userName && touched.userName}
								errorMessage={errors.userName}
							>
								<Field
									type="text"
									autoComplete="off"
									name="userName"
									placeholder={t(`${p}.username.placeholder`)}
									component={Input}
								/>
							</FormItem>
							<FormItem
								label={t(`${p}.password.label`)}
								invalid={errors.password && touched.password}
								errorMessage={errors.password}
							>
								<Field
									autoComplete="off"
									name="password"
									placeholder={t(`${p}.password.placeholder`)}
									component={PasswordInput}
								/>
							</FormItem>
							<div className="flex justify-between mb-6">
								<Field className="mb-0" name="rememberMe" component={Checkbox} children={t(`${p}.remember`)} />
								<ActionLink to={forgotPasswordUrl}>
									{t(`${p}.forgotPassword`)}
								</ActionLink>
							</div>
							<Button block loading={isSubmitting} variant="solid" type="submit">
								{ isSubmitting ? t(`${p}.submit.loading`) : t(`${p}.submit.label`) }
							</Button>
							<div className="mt-4 text-center">
								<span>{t(`${p}.register`)}</span>
								<ActionLink to={signUpUrl}>
									{t(`${p}.registerLink`)}
								</ActionLink>
							</div>
						</FormContainer>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default SignInForm