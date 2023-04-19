import React, { useState } from 'react'
import { Input, Button, FormItem, FormContainer } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'
import useUser from 'utils/hooks/custom/useUser'
import openNotification from 'utils/openNotification'
import { useSelector } from 'react-redux'

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .required(`.password.error.required`),
    newPassword: Yup.string()
        .required(`.newPassword.error.required`)
        .min(6, `.newPassword.error.min`)
        .notOneOf([Yup.ref('password'), null], `.newPassword.error.noMatch`),
    confirmPassword: Yup.string()
        .required(`.confirmPassword.error.required`)
        .oneOf([Yup.ref('newPassword'), null], `.confirmPassword.error.match`),
})

const p = 'profile.password'
const Password = () => {
    const { t } = useTranslation()
    const { changePassword } = useUser()
	const { id: userId } = useSelector((state) => state.auth.user)
    const [pwInputType, setPwInputType] = useState({
        password: 'password',
        newPassword: 'password',
        confirmPassword: 'password',
    })

    const onPasswordVisibleClick = (name) => setPwInputType({ ...pwInputType, [name]: pwInputType[name] === 'password' ? 'text' : 'password', })

    const getSufixIcon = (name) => {
        return (
            <span
                className="cursor-pointer"
                onClick={() => onPasswordVisibleClick(name)}
            >
                {pwInputType[name] === 'password' ? (
                    <HiOutlineEyeOff />
                ) : (
                    <HiOutlineEye />
                )}
            </span>
        )
    }

    const passwordVisible = {
        password: getSufixIcon('password'),
        newPassword: getSufixIcon('newPassword'),
        confirmPassword: getSufixIcon('confirmPassword'),
    }

    const onSubmit = async (values, { resetForm, setSubmitting }) => {
        setSubmitting(true)
        const data = {
            password: values.password,
            newPassword: values.newPassword,
        }

        const resp = await changePassword(userId, data)

        if (resp.status === 'success') {
            openNotification({ title: t(`message.success`), subtitle: t(`${p}.message.success`), type: 'success' })
            resetForm?.()
        }

        if (resp.status === 'failed') {
            openNotification({ title: t(`message.error`), subtitle: t(`${resp.message}`), type: 'danger' })
        }
        setSubmitting(false)
    }

    return (
        <>
            <div className="mb-2">
                <h4>
                    {t(`${p}.title`)}
                </h4>
            </div>
            <Formik
                initialValues={{
                    password: '',
                    newPassword: '',
                    confirmPassword: '',
                }}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={async(values, { resetForm, setSubmitting }) => {
                    await onSubmit(values, { resetForm, setSubmitting })
                }}
            >
                {({ resetForm, touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <FormItem
                                    label={t(`${p}.form.password.label`)}
                                    invalid={errors.password && touched.password}
                                    errorMessage={t(`${p}.form${errors.password}`)}
                                >
                                    <Field
                                        type={pwInputType['password']}
                                        suffix={passwordVisible['password']}
                                        autoComplete="off"
                                        name="password"
                                        placeholder={t(`${p}.form.password.placeholder`)}
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label={t(`${p}.form.newPassword.label`)}
                                    invalid={errors.newPassword && touched.newPassword}
                                    errorMessage={t(`${p}.form${errors.newPassword}`)}
                                >
                                    <Field
                                        type={pwInputType['newPassword']}
                                        suffix={passwordVisible['newPassword']}
                                        autoComplete="off"
                                        name="newPassword"
                                        placeholder={t(`${p}.form.newPassword.placeholder`)}
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label={t(`${p}.form.confirmPassword.label`)}
                                    invalid={errors.confirmPassword && touched.confirmPassword}
                                    errorMessage={t(`${p}.form${errors.confirmPassword}`)}
                                >
                                    <Field
                                        type={pwInputType['confirmPassword']}
                                        suffix={passwordVisible['confirmPassword']}
                                        autoComplete="off"
                                        name="confirmPassword"
                                        placeholder={t(`${p}.form.confirmPassword.placeholder`)}
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem>
                                    <div className="flex gap-2">
                                        <Button type="reset" onClick={resetForm}>
                                            {t(`${p}.form.cancel`)}
                                        </Button>
                                        <Button
                                            variant="solid"
                                            type="submit"
                                            loading={isSubmitting}
                                        >
                                            {isSubmitting ? t(`${p}.form.submit.loading`) : t(`${p}.form.submit.label`)}
                                        </Button>
                                    </div>
                                </FormItem>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default Password

