
import React from 'react'
import { Input, Button, FormItem, FormContainer, DatePicker } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, '.name.error.min')
        .max(50, '.name.error.max')
        .required('.name.error.required'),
    amount: Yup.number()
        .required('.amount.error.required'),
    dateRange: Yup.array()
        .min(2, '.dateRange.error.min')
        .max(2, '.dateRange.error.max')
        .required('.dateRange.error.required')
        .nullable(),
})

const p = 'budget.form' // path to translation file
const BudgetForm = ({ initialValues, onSubmit, onCancel }) => {
    const { t } = useTranslation()

    console.log('initialValues', initialValues)
    return (
        <div>
            <Formik
                initialValues={ initialValues || {
                    name: '',
                    amount: '',
                    dateRange: [],
                }}
                validationSchema={validationSchema}
                onSubmit={async(values, { setSubmitting }) => {
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
                                />
                            </FormItem>

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
                                    step='any'
                                />
                            </FormItem>

                            <FormItem
                                label={`${t(`${p}.dateRange.label`)}`}
                                invalid={Boolean(errors.dateRange && touched.dateRange)}
                                errorMessage={t(`${p}${errors.dateRange}`)}
                            >
                                <Field name="dateRange">
                                    {({ field, form }) => (
                                        <DatePicker.DatePickerRange
                                            field={field}
                                            form={form}
                                            placeholder={`${t(`${p}.dateRange.placeholder`)}`}
                                            value={field.value.length > 0 ? field.value : [null, null]}
                                            onChange={(date) => {
                                                const value = (date[0] && date[1]) ? date : []
                                                form.setFieldValue(
                                                    field.name,
                                                    value
                                                )
                                            }}
                                        />
                                    )}
                                </Field>
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

export default BudgetForm

