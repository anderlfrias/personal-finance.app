
import React from 'react'
import { Input, Button, FormItem, FormContainer, DatePicker, Select } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    amount: Yup.number()
        .required('.amount.error.required'),
    description: Yup.string()
        .min(3, '.description.error.min')
        .max(256, '.description.error.max')
        .nullable(),
    date: Yup.date()
        .required('.date.error.required')
        .nullable(),
    type: Yup.string()
        .required('.type.error.required'),
    wallet: Yup.string()
        .required('.wallet.error.required'),
})

const wallets = [
    { value: '1', label: 'wallet 1' },
    { value: '2', label: 'wallet 2' },
    { value: '3', label: 'wallet 3' },
]

const p = 'transaction.form' // path to translation file
const TransactionForm = ({ initialValues, onSubmit, onCancel }) => {
    const { t } = useTranslation()

    return (
        <div>
            <Formik
                initialValues={ initialValues || {
                    name: '',
                    description: '',
                }}
                validationSchema={validationSchema}
                onSubmit={async(values, { setSubmitting }) => {
                    setSubmitting(true)
                    console.log(values);
                    await onSubmit(values)
                    setSubmitting(false)
                }}
            >
                {({ touched, errors, resetForm, isSubmitting, values}) => (
                    <Form>
                        <FormContainer>
                            {/* <div className='max-h-96 overflow-y-auto px-2'> */}
                            <FormItem
                                label={`${t(`${p}.amount.label`)}`}
                                invalid={errors.amount && touched.amount}
                                errorMessage={t(`${p}${errors.amount}`)}
                            >
                                <Field
                                    type="number"
                                    autoComplete="off"
                                    name="amount"
                                    placeholder={`${t(`${p}.amount.placeholder`)}`}
                                    component={Input}
                                />
                            </FormItem>

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

                            <FormItem
                                label={`${t(`${p}.date.label`)}`}
                                invalid={errors.date && touched.date}
                                errorMessage={t(`${p}${errors.date}`)}
                            >
                                <Field name="date">
                                    {({ field, form }) => (
                                        <DatePicker
                                            placeholder={t(`${p}.date.placeholder`)}
                                            field={field}
                                            form={form}
                                            value={field.value}
                                            onChange={(date) => {
                                                form.setFieldValue(
                                                    field.name,
                                                    date
                                                )
                                            }}
                                        />
                                    )}
                                </Field>
                            </FormItem>

                            <FormItem
                                label={t(`${p}.wallet.label`)}
                                invalid={errors.wallet && touched.wallet}
                                errorMessage={t(`${p}${errors.wallet}`)}
                            >
                                <Field name="wallet">
                                    {({ field, form }) => (
                                        <Select
                                            placeholder={t(`${p}.wallet.placeholder`)}
                                            field={field}
                                            form={form}
                                            options={wallets}
                                            value={wallets.filter(
                                                (option) =>
                                                    option.value ===
                                                    values.wallet
                                            )}
                                            onChange={(option) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    option.value
                                                )
                                            }
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            {/* </div> */}

                            <FormItem className='mt-2'>
                                <Button
                                    type="reset"
                                    className="ltr:mr-2 rtl:ml-2"
                                    variant="plain"
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

export default TransactionForm