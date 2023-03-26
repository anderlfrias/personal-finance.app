
import React, { useEffect, useState } from 'react'
import { Input, Button, FormItem, FormContainer, DatePicker, Select, Segment } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import useWallet from 'utils/hooks/custom/useWallet';
import useCategory from 'utils/hooks/custom/useCategory';
import * as Yup from 'yup'
import { SegmentItemOption } from 'components/shared';
import { HiCheckCircle } from 'react-icons/hi';
import { BiLineChart, BiLineChartDown } from 'react-icons/bi';
import useBudget from 'utils/hooks/custom/useBudget';

const { DateTimepicker } = DatePicker

const validationSchema = Yup.object().shape({
    type: Yup.string()
        .required('.type.error.required'),
    amount: Yup.number()
        .required('.amount.error.required'),
    description: Yup.string()
        .min(3, '.description.error.min')
        .max(256, '.description.error.max')
        .required('.description.error.required'),
    date: Yup.date()
        .required('.date.error.required')
        .nullable(),
    wallet: Yup.string()
        .required('.wallet.error.required'),
    category: Yup.string()
        .nullable(),
    budget: Yup.string()
        .nullable(),
})

const typeOptions = [
    { value: 'income', icon: <BiLineChart /> },
    { value: 'expense', icon: <BiLineChartDown /> }
]

const p = 'transaction.form' // path to translation file
const TransactionForm = ({ initialValues, onSubmit, onCancel, isEditing }) => {
    const { t } = useTranslation()
    const { getWallets } = useWallet();
    const { getCategories } = useCategory()
    const { getBudgets } = useBudget()
    const [wallets, setWallets] = useState([])
    const [categories, setCategories] = useState([])
    const [budgets, setBudgets] = useState([])

    useEffect(() => {
        const fetchWallets = async() => {
            const resp = await getWallets()
            if (resp.status === 'success') {
                setWallets(
                    resp.data.map((wallet) => ({
                        value: wallet.id,
                        label: wallet.name,
                    }))
                )
            }
        }

        const fetchCategories = async() => {
            const resp = await getCategories()
            if (resp.status === 'success') {
                setCategories(
                    resp.data.map((category) => ({
                        value: category.id,
                        label: category.name,
                    }))
                )
            }
        }

        const fetchBudgets = async() => {
            const resp = await getBudgets({ active: true })

            if (resp.status === 'success') {
                console.log(resp.data)
                setBudgets(
                    resp.data.map((budget) => ({
                        value: budget.id,
                        label: budget.name
                    }))
                )
            }
        }

        fetchWallets()
        fetchCategories()
        fetchBudgets()
    }, [getWallets, getCategories, getBudgets])

    // useEffect(() => {
    //     console.log(initialValues)
    // }, [])
    return (
        <div>
            <Formik
                initialValues={ initialValues || {
                    type: '',
                    amount: '',
                    description: '',
                    date: new Date(),
                    wallet: '',
                    category: '',
                    budget: ''
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
                                label={`${t(`${p}.date.label`)}`}
                                invalid={errors.date && touched.date}
                                errorMessage={t(`${p}${errors.date}`)}
                            >
                                <Field name="date" >
                                    {({ field, form }) => (
                                        <DateTimepicker
                                            disabled={isEditing}
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
                                label={`${t(`${p}.type.label`)}`}
                                invalid={errors.type && touched.type}
                                errorMessage={t(`${p}${errors.type}`)}
                            >
                                <Field name="type">
                                    {({ field, form }) => (
                                        <Segment
                                            className="w-full"
                                            value={[values.type]}
                                            onChange={(val) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    val[0]
                                                )
                                            }
                                        >
                                            <div className="flex w-full items-center gap-3">
                                                { typeOptions.map((item) => (
                                                    <Segment.Item value={item.value} key={item.value} disabled={isEditing}>
                                                    {({ ref, active, onSegmentItemClick, disabled}) => {
                                                        return (
                                                            <div className="text-center">
                                                                <SegmentItemOption
                                                                    hoverable
                                                                    ref={ref}
                                                                    active={active}
                                                                    disabled={disabled}
                                                                    defaultGutter={false}
                                                                    onSegmentItemClick={onSegmentItemClick}
                                                                    className="relative w-[166px] h-[50px]"
                                                                    customCheck={<HiCheckCircle className="text-indigo-600 absolute top-2 right-2 text-lg" />}
                                                                >
                                                                    <div className="w-full flex items-center pl-3 gap-3">
                                                                        <span className={`text-2xl ${active && 'text-indigo-600'}`}>{item.icon}</span>
                                                                        <h6>
                                                                            {t(`transaction.type.${item.value}`)}
                                                                        </h6>
                                                                    </div>
                                                                </SegmentItemOption>
                                                            </div>
                                                        )
                                                    }}
                                                    </Segment.Item>
                                                ))}
                                            </div>
                                        </Segment>
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
                                    disabled={isEditing}
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
                                                    option?.value || ''
                                                )
                                            }
                                            isDisabled={isEditing}
                                        />
                                    )}
                                </Field>
                            </FormItem>

                            <FormItem
                                label={t(`${p}.category.label`)}
                                invalid={errors.category && touched.category}
                                errorMessage={t(`${p}${errors.category}`)}
                            >
                                <Field name="category">
                                    {({ field, form }) => (
                                        <Select
                                            placeholder={t(`${p}.category.placeholder`)}
                                            field={field}
                                            form={form}
                                            options={categories}
                                            value={categories.filter(
                                                (option) =>
                                                    option.value ===
                                                    values.category
                                            )}
                                            onChange={(option) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    option?.value || ''
                                                )
                                            }
                                            disabled={isEditing}
                                            isClearable
                                        />
                                    )}
                                </Field>
                            </FormItem>

                            {
                                values?.type === 'expense' && (
                                    <FormItem
                                        label={t(`${p}.budget.label`)}
                                        invalid={errors.budget && touched.budget}
                                        errorMessage={t(`${p}${errors.budget}`)}
                                    >
                                        <Field name="budget">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder={t(`${p}.budget.placeholder`)}
                                                    field={field}
                                                    form={form}
                                                    options={budgets}
                                                    value={budgets.filter(
                                                        (option) =>
                                                            option.value ===
                                                            values.budget
                                                    )}
                                                    onChange={(option) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            option?.value || ''
                                                        )
                                                    }
                                                    disabled={isEditing}
                                                    isClearable
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                )
                            }
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