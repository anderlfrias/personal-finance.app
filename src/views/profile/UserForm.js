
import React from 'react'
import { Input, Button, FormItem, FormContainer, Upload } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import ProfilePic from 'components/helpers/ProfilePic'
import { convertirImagenToBase64 } from 'utils/image'
import { HiPencil } from 'react-icons/hi'

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
					profilePic: '',
                }}
                validationSchema={validationSchema}
                onSubmit={async(values, { setSubmitting }) => {
                    await onSubmit(values)
                    setSubmitting(false)
                }}
            >
                {({ touched, errors, resetForm, isSubmitting, values }) => (
                    <Form>
                        <FormContainer>
							<FormItem
								label="Foto de perfil"
							>
								<Field name='profilePic'>
									{({ field, form }) => (
										<div className='group relative w-24 h-24'>
											<ProfilePic size={96} className='absolute w-full h-full' image={values.profilePic} />
											<Upload
												className="absolute w-full h-full bg-gray-900/[.7] rounded-full group-hover:flex hidden text-xl items-center justify-center"
												onChange={(file) => {
													convertirImagenToBase64(file[0], async(base64Image) => {
														form.setFieldValue(field.name, base64Image);
													});
												}}
												showList={false}
												uploadLimit={1}
											>
												<span className="text-2xl text-gray-100 hover:text-gray-300 cursor-pointer p-1.5">
													<HiPencil />
												</span>
											</Upload>
										</div>
									)}
								</Field>
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

