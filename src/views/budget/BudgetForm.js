
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
        .of(Yup.date())
        .min(2, '.dateRange.error.min')
        .max(2, '.dateRange.error.max')
        .required('.dateRange.error.required'),
    startDate: Yup.date()
            .required('.startDate.error.required')
            .nullable(),
    endDate: Yup.date()
            .required('.endDate.error.required')
            .nullable(),
})

const p = 'budget.form' // path to translation file
const BudgetForm = ({ initialValues, onSubmit, onCancel }) => {
    const { t } = useTranslation()

    return (
        <div>
            <Formik
                initialValues={ initialValues || {
                    name: '',
                    amount: '',
                    startDate: null,
                    endDate: null,
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
                                    textArea
                                    step='any'
                                />
                            </FormItem>

                            <FormItem
                                label={`${t(`${p}.date.label`)}`}
                                asterisk
                                invalid={errors.star && touched.star}
                                errorMessage={errors.star}
                            >
                                <Field name="date" placeholder={`${t(`${p}.date.placeholder`)}`}>
                                    {({ field, form }) => (
                                        <DatePicker
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

