
import React, { useEffect, useState } from 'react'
import { Input, Button, FormItem, FormContainer, DatePicker, Select, Radio } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import useWallet from 'utils/hooks/custom/useWallet';
import * as Yup from 'yup'

const { DateTimepicker } = DatePicker

const validationSchema = Yup.object().shape({
    amount: Yup.number()
        .required('.amount.error.required'),
    description: Yup.string()
        .min(3, '.description.error.min')
        .max(256, '.description.error.max')
        .required('.description.error.required'),
    date: Yup.date()
        .required('.date.error.required')
        .nullable(),
    type: Yup.string()
        .required('.type.error.required'),
    wallet: Yup.string()
        .required('.wallet.error.required'),
})

const p = 'transaction.form' // path to translation file
const TransactionForm = ({ initialValues, onSubmit, onCancel }) => {
    const { t } = useTranslation()
    const { getWallets } = useWallet();
    const [wallets, setWallets] = useState([])

    useEffect(() => {
        const fetchWallets = async() => {
            const resp = await getWallets()
            console.log(resp)
            if (resp.status === 'success') {
                setWallets(
                    resp.data.map((wallet) => ({
                        value: wallet.id,
                        label: wallet.name,
                    }))
                )
            }
        }

        fetchWallets()
    }, [getWallets])
    return (
        <div>
            <Formik
                initialValues={ initialValues || {
                    type: '',
                    amount: '',
                    description: '',
                    date: null,
                    wallet: '',
                }}
                validationSchema={validationSchema}
                onSubmit={ async(values, { setSubmitting }) => {
                    setSubmitting(true)
                    await onSubmit(values)
                    setSubmitting(false)
                }}
            >
                {({ touched, errors, resetForm, isSubmitting, values}) => (
                    <Form>
                        <FormContainer>
                            {/* <div className='max-h-96 overflow-y-auto px-2'> */}
                            <FormItem
                                label={`${t(`${p}.type.label`)}`}
                                invalid={errors.type && touched.type}
                                errorMessage={t(`${p}${errors.type}`)}
                            >
                                <Field name="type">
                                    {({ field, form }) => (
                                        <Radio.Group
                                            value={values.type}
                                            onChange={(val) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    val
                                                )
                                            }
                                        >
                                            <Radio value={'expense'}>{t(`transaction.type.expense`)}</Radio>
                                            <Radio value={'income'}>{t(`transaction.type.income`)}</Radio>
                                        </Radio.Group>
                                    )}
                                </Field>
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
                                    step="any"
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
                                        <DateTimepicker
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