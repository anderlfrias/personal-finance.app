import React from 'react'
import { Input, Button, FormItem, FormContainer, Alert } from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from 'utils/hooks/useAuth'
import { useTranslation } from 'react-i18next'


const validationSchema = Yup.object().shape({
	name: Yup.string()
		.required(`.name.error.required`),
	firstSurname: Yup.string()
		.required(`.firstSurname.error.required`),
	secondSurname: Yup.string()
		.required(`.secondSurname.error.required`),
	username: Yup.string()
		.required(`.username.error.required`),
	email: Yup.string()
		.email(`.email.error.email`)
		.required(`.email.error.required`),
	password: Yup.string()
		.required(`.password.error.required`),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], '.confirm.error.dontmatch')
})

const p = 'signup.form';

const SignUpForm = props => {
	const { t } = useTranslation()

	const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

	const { signUp } = useAuth()

	const [message, setMessage] = useTimeOutMessage()

	const onSignUp = async (values, setSubmitting) => {
		const { userName, password, email } = values
		setSubmitting(true)
		const result = await signUp({ userName, password, email })

		if (result.status === 'failed') {
			setMessage(t(result.message))
		}

		setSubmitting(false)
	}

	return (
		<div className={className}>
			{message && <Alert className="mb-4" type="danger" showIcon>{message}</Alert>}
			<Formik
				initialValues={{
					name: '',
					firstSurname: '',
					secondSurname: '',
					username: '',
					password: '',
					confirmPassword: '',
					email: ''
				}}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					if(!disableSubmit) {
						onSignUp(values, setSubmitting)
					} else {
						setSubmitting(false)
					}
				}}
			>
				{({touched, errors, isSubmitting}) => (
					<Form>
						<FormContainer>
							<FormItem
								label="User Name"
								invalid={errors.username && touched.username}
								errorMessage={errors.username}
							>
								<Field 
									type="text" 
									autoComplete="off" 
									name="username" 
									placeholder="User Name" 
									component={Input} 
								/>
							</FormItem>
							<FormItem
								label="Email"
								invalid={errors.email && touched.email}
								errorMessage={errors.email}
							>
								<Field 
									type="email" 
									autoComplete="off" 
									name="email" 
									placeholder="Email" 
									component={Input} 
								/>
							</FormItem>
							<FormItem
								label="Password"
								invalid={errors.password && touched.password}
								errorMessage={errors.password}
							>
								<Field
									autoComplete="off" 
									name="password" 
									placeholder="Password" 
									component={PasswordInput} 
								/>
							</FormItem>
							<FormItem
								label="Confirm Password"
								invalid={errors.confirmPassword && touched.confirmPassword}
								errorMessage={errors.confirmPassword}
							>
								<Field
									autoComplete="off" 
									name="confirmPassword" 
									placeholder="Confirm Password" 
									component={PasswordInput} 
								/>
							</FormItem>
							<Button 
								block 
								loading={isSubmitting} 
								variant="solid" 
								type="submit"
							>
								{ isSubmitting ? 'Creating Account...' : 'Sign Up' }
							</Button>
							<div className="mt-4 text-center">
								<span>Already have an account? </span>
								<ActionLink to={signInUrl}>
									Sign in
								</ActionLink>
							</div>
						</FormContainer>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default SignUpForm