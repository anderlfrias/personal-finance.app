import React, { useState } from 'react'
import { Button, FormItem, FormContainer, Alert } from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { useNavigate, useParams } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from 'utils/hooks/useAuth'
import { useTranslation } from 'react-i18next'

const validationSchema = Yup.object().shape({
	password: Yup.string().required('password.error.required').min(6, 'password.error.min'),
	confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'confirmPassword.error.match')
})

const p = 'resetPassword.form'
const ResetPasswordForm = props => {
	const { t } = useTranslation()
	const { token } = useParams()
	const { resetPassword } = useAuth()
	const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

	const [ resetComplete, setResetComplete ] = useState(false)

	const [ message, setMessage ] = useTimeOutMessage()

	const navigate = useNavigate()

	const onSubmit = async (values, setSubmitting) => {
		const { password } = values
		setSubmitting(true)

		const resp = await resetPassword({ password }, token)
		if (resp.status === 'success') {
			setSubmitting(false)
			setResetComplete(true)
		}

		if (resp.status === 'failed') {
			setMessage(resp.message)
			setSubmitting(false)
		}
	}

	const onContinue = () => {
		navigate('/sign-in')
	}

	return (
		<div className={className}>
			<div className="mb-6">
				{
					resetComplete ?
					<>
						<h3 className="mb-1">{t(`${p}.resetDone.title`)}</h3>
						<p>{t(`${p}.resetDone.subtitle`)}</p>
						<p>{t(`${p}.resetDone.message`)}</p>
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
					password: '',
					confirmPassword: '',
				}}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					if(!disableSubmit) {
						onSubmit(values, setSubmitting)
					} else {
						setSubmitting(false)
					}
				}}
			>
				{({touched, errors, isSubmitting}) => (
					<Form>
						<FormContainer>
							{
								!resetComplete ? (
									<>
										<FormItem
											label={t(`${p}.confirmPassword.label`)}
											invalid={errors.password && touched.password}
											errorMessage={t(`${p}.${errors.password}`)}
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
											errorMessage={t(`${p}.${errors.confirmPassword}`)}
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
											{ isSubmitting ? t(`${p}.submit.loading`) : t(`${p}.submit.label`)  }
										</Button>
									</>
								)
								:
								(
									<Button 
										block 
										variant="solid" 
										type="button"
										onClick={onContinue}
									>
										{t(`${p}.continue`)}
									</Button>
								)
							}

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

export default ResetPasswordForm