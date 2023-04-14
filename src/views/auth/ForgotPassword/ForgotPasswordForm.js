import React, { useState } from 'react'
import { Input, Button, FormItem, FormContainer, Alert } from 'components/ui'
import { ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from 'utils/hooks/useAuth'
import { useTranslation } from 'react-i18next'

const validationSchema = Yup.object().shape({
	email: Yup.string().required('.email.error.required').email('.email.error.email'),
})

const p = 'forgotPassword.form';
const ForgotPasswordForm = props => {
	const { t } = useTranslation()
	const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

	const [ emailSent, setEmailSent ] = useState(false)

	const [ message, setMessage ] = useTimeOutMessage()

	const { forgotPassword } = useAuth()

	const onSendMail = async (values, setSubmitting) => {
		setSubmitting(true)
		const resp = await forgotPassword(values)

		if (resp.status === 'success') {
			setEmailSent(true)
		}

		if (resp.status === 'failed') {
			setMessage(t(resp.message))
		}

		setSubmitting(false)
	}

	return (
		<div className={className}>
            <div className="mb-6">
				{
					emailSent ?
					<>
						<h3 className="mb-1">{t(`${p}.emailSent.title`)}</h3>
						<p>{t(`${p}.emailSent.subtitle`)}</p>
					</>
					:
					<>
						<h3 className="mb-1">{t(`${p}.title`)}</h3>
						<p>{t(`${p}.subtitle`)}</p>
					</>
				}
			</div>
			{message && <Alert className="mb-4" type="danger" showIcon>{message}</Alert>}
			<Formik
				initialValues={{
					email: '',
				}}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					if(!disableSubmit) {
						onSendMail(values, setSubmitting)
					} else {
						setSubmitting(false)
					}
				}}
			>
				{({touched, errors, isSubmitting}) => (
					<Form>
						<FormContainer>
							<div className={emailSent ? 'hidden' : ''}>
								<FormItem
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
							</div>
							<Button block loading={isSubmitting} variant="solid" type="submit">
								{
									isSubmitting ?
									t(`${p}.submit.loading`)
									:
									emailSent ?
									t(`${p}.submit.sent`)
									:
									t(`${p}.submit.label`)
								}
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

export default ForgotPasswordForm