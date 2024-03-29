
import React from 'react'
import { Input, Button, FormItem, FormContainer } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, '.name.error.min')
        .max(50, '.name.error.max')
        .required('.name.error.required'),
    description: Yup.string()
        .min(3, '.description.error.min')
        .max(256, '.description.error.max')
        .nullable(),
    // balance: Yup.number()
    //     .required('.balance.error.required'),
})

const p = 'wallet.form' // path to translation file
const WalletForm = ({ initialValues, onSubmit, onCancel }) => {
    const { t } = useTranslation()

    return (
        <div>
            <Formik
                initialValues={ initialValues || {
                    name: '',
                    description: '',
                    // balance: '',
                }}
                validationSchema={validationSchema}
                onSubmit={async(values, { resetForm, setSubmitting }) => {
                    setSubmitting(true)
                    await onSubmit(values)
                    setSubmitting(false)
                }}
            >
                {({ touched, errors, resetForm, isSubmitting}) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label={`${t(`${p}.name.label`)}`}
                                invalid={errors.name && touched.name}
                                errorMessage={t(`${p}${errors.name}`)}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder={`${t(`${p}.name.placeholder`)}`}
                                    component={Input}
                                    autoFocus
                                />
                            </FormItem>

                            {/* <FormItem
                                label={`${t(`${p}.balance.label`)}`}
                                invalid={errors.balance && touched.balance}
                                errorMessage={t(`${p}${errors.balance}`)}
                            >
                                <Field
                                    type="number"
                                    autoComplete="off"
                                    name="balance"
                                    placeholder={`${t(`${p}.balance.placeholder`)}`}
                                    component={Input}
                                    step='any'
                                />
                            </FormItem> */}

                            <FormItem
                                label={`${t(`${p}.description.label`)}`}
                                invalid={errors.description && touched.description}
                                errorMessage={t(`${p}${errors.description}`)}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="description"
                                    placeholder={`${t(`${p}.description.placeholder`)}`}
                                    component={Input}
                                    textArea
                                />
                            </FormItem>

                            <FormItem>
                                <Button
                                    type="reset"
                                    className="ltr:mr-2 rtl:ml-2"
                                    onClick={() => {
                                        resetForm()
                                        onCancel()
                                    }}
                                >
                                    { t(`${p}.cancel`) }
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

export default WalletForm

