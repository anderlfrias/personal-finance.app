import React from 'react'
import { Input, Button, FormItem, FormContainer } from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
// import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from 'utils/hooks/useAuth'
import { useTranslation } from 'react-i18next'
import openNotification from 'utils/openNotification'
import { useNavigate } from 'react-router-dom'


const validationSchema = Yup.object().shape({
	name: Yup.string()
		.required(`.name.error.required`),
	firstSurname: Yup.string()
		.required(`.firstSurname.error.required`),
	secondSurname: Yup.string()
		.nullable(),
	username: Yup.string()
		.required(`.username.error.required`)
		.matches(/^[a-zA-Z0-9]+$/, '.username.error.invalid'),
	email: Yup.string()
		.email(`.email.error.email`)
		.required(`.email.error.required`),
	password: Yup.string()
		.required(`.password.error.required`)
		.min(6, '.password.error.min'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], '.confirmPassword.error.match')
		.required(`.confirmPassword.error.required`)
})

const p = 'signup.form';

const SignUpForm = props => {
	const navigate = useNavigate()
	const { t } = useTranslation()

	const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

	const { signUp } = useAuth()

	// const [message, setMessage] = useTimeOutMessage()

	const onSignUp = async (values, setSubmitting) => {
		setSubmitting(true)

		const { name, firstSurname, secondSurname, username, password, email } = values
		const result = await signUp({ name, firstSurname, secondSurname, username, password, email })

		if (result.status === 'success') {
			navigate(`/send-confirm-email/${result.data.user.id}`, { state: { email: result.data.user.email } })
			openNotification({
				type: 'success',
				title: '',
				subtitle: t(`${p}.message.success`),
			})
		}

		if (result.status === 'failed') {
			openNotification({ type: 'danger', title: t(result.message) })
		}

		setSubmitting(false)
	}

	return (
		<div className={className}>
			{/* {message && <Alert className="mb-4" type="danger" showIcon>{message}</Alert>} */}
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
								label={t(`${p}.name.label`)}
								invalid={errors.name && touched.name}
								errorMessage={t(`${p}${errors.name}`)}
							>
								<Field
									type="text"
									autoComplete="off"
									name="name"
									placeholder={t(`${p}.name.placeholder`)}
									component={Input}
								/>
							</FormItem>

							<FormItem
								label={t(`${p}.firstSurname.label`)}
								invalid={errors.firstSurname && touched.firstSurname}
								errorMessage={t(`${p}${errors.firstSurname}`)}
							>
								<Field
									type="text"
									autoComplete="off"
									name="firstSurname"
									placeholder={t(`${p}.firstSurname.placeholder`)}
									component={Input}
								/>
							</FormItem>

							<FormItem
								label={t(`${p}.secondSurname.label`)}
								invalid={errors.secondSurname && touched.secondSurname}
								errorMessage={t(`${p}${errors.secondSurname}`)}
							>
								<Field
									type="text"
									autoComplete="off"
									name="secondSurname"
									placeholder={t(`${p}.secondSurname.placeholder`)}
									component={Input}
								/>
							</FormItem>

							<FormItem
								label={t(`${p}.username.label`)}
								invalid={errors.username && touched.username}
								errorMessage={t(`${p}${errors.username}`)}
							>
								<Field
									type="text"
									autoComplete="off"
									name="username"
									placeholder={t(`${p}.username.placeholder`)}
									component={Input}
								/>
							</FormItem>

							<FormItem
								label={t(`${p}.email.label`)}
								invalid={errors.email && touched.email}
								errorMessage={t(`${p}${errors.email}`)}
							>
								<Field
									type="email"
									autoComplete="off"
									name="email"
									placeholder={t(`${p}.email.placeholder`)}
									component={Input}
								/>
							</FormItem>

							<FormItem
								label={t(`${p}.password.label`)}
								invalid={errors.password && touched.password}
								errorMessage={t(`${p}${errors.password}`)}
							>
								<Field
									autoComplete="off"
									name="password"
									placeholder={t(`${p}.password.placeholder`)}
									component={PasswordInput}
								/>
							</FormItem>

							<FormItem
								label={t(`${p}.confirmPassword.label`)}
								invalid={errors.confirmPassword && touched.confirmPassword}
								errorMessage={t(`${p}${errors.confirmPassword}`)}
							>
								<Field
									autoComplete="off"
									name="confirmPassword"
									placeholder={t(`${p}.confirmPassword.placeholder`)}
									component={PasswordInput}
								/>
							</FormItem>

							<Button
								block
								loading={isSubmitting}
								variant="solid"
								type="submit"
							>
								{ isSubmitting ? t(`${p}.submit.loading`) : t(`${p}.submit.label`) }
							</Button>

							<div className="mt-4 text-center">
								<span>{t(`${p}.login`)} </span>
								<ActionLink to={signInUrl}>
									{t(`${p}.loginLink`)}
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