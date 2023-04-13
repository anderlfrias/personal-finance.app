
import React from 'react'
import { Input, Button, FormItem, FormContainer } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'

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
})

const p = 'profile.userInfo.form';
const UserForm = ({ initialValues, onSubmit, onCancel }) => {
    const { t } = useTranslation()
    return (
        <div>
            <Formik
                initialValues={ initialValues || {
                    username: '',
                    email: '',
                    name: '',
                    firstSurname: '',
                    secondSurname: '',
                }}
                validationSchema={validationSchema}
                onSubmit={async(values, { setSubmitting }) => {
                    await onSubmit(values)
                    setSubmitting(false)
                }}
            >
                {({ touched, errors, resetForm, isSubmitting }) => (
                    <Form>
                        <FormContainer>
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
                                    disabled
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
                                    disabled
								/>
							</FormItem>
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

                            <FormItem>
                                <Button
                                    type="reset"
                                    className="ltr:mr-2 rtl:ml-2"
                                    onClick={onCancel}
                                >
                                    {t(`${p}.cancel`)}
                                </Button>
                                <Button variant="solid" type="submit" loading={isSubmitting}>
                                    { isSubmitting ? t(`${p}.submit.loading`) : t(`${p}.submit.label`) }
                                </Button>
                            </FormItem>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default UserForm

