
import React, { useEffect, useState } from 'react'
import { Input, FormItem, FormContainer, DatePicker, Select, Segment, Upload, useConfig } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import useWallet from 'utils/hooks/custom/useWallet';
import useCategory from 'utils/hooks/custom/useCategory';
import * as Yup from 'yup'
import { Loading, SegmentItemOption } from 'components/shared';
import { HiCheckCircle, HiSwitchHorizontal } from 'react-icons/hi';
import { BiLineChart, BiLineChartDown } from 'react-icons/bi';
import useBudget from 'utils/hooks/custom/useBudget';
import { convertirImagenToBase64, resizeImage } from 'utils/image';
import Image from 'components/helpers/Image';
import openNotification from 'utils/openNotification';
import formatCurrency from 'utils/formatCurrency';
import { getRemain } from 'views/budget/utils';

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
    wallet: Yup.string().nullable(),
    sourceWallet: Yup.string().nullable(),
    targetWallet: Yup.string().nullable(),
    category: Yup.string()
        .nullable(),
    budget: Yup.string()
        .nullable(),
    evidence: Yup.array()
})

const typeOptions = [
    { value: 'income', icon: <BiLineChart /> },
    { value: 'expense', icon: <BiLineChartDown /> },
    { value: 'transfer', icon: <HiSwitchHorizontal /> },
]

const p = 'transaction.form' // path to translation file
const TransactionForm = ({ initialValues, onSubmit, onCancel, isEditing, innerRef  }) => {
	const { themeColor, primaryColorLevel, mode } = useConfig()
    const { t } = useTranslation()
    const { getWallets } = useWallet();
    const { getCategories } = useCategory()
    const { getBudgets } = useBudget()
    const [wallets, setWallets] = useState([])
    const [categories, setCategories] = useState([])
    const [budgets, setBudgets] = useState([])
    const [uploadingImage, setUploadingImage] = useState(false)

    const handleUpload = async (file, cb) => {
        setUploadingImage(true)
        const image = await resizeImage({ image: file, format: 'webp' })
        convertirImagenToBase64(image, (base64) => {
            cb(base64)
        })
        setUploadingImage(false)
    }
    useEffect(() => {
        const fetchWallets = async () => {
            const resp = await getWallets()
            if (resp.status === 'success') {
                setWallets(
                    resp.data.map((wallet) => ({
                        value: wallet.id,
                        label: `${wallet.name} - ${formatCurrency(wallet.balance)}`,
                    }))
                )
            }
        }

        const fetchCategories = async () => {
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

        const fetchBudgets = async () => {
            const resp = await getBudgets({ active: true })

            if (resp.status === 'success') {
                setBudgets(
                    resp.data.map((budget) => ({
                        value: budget.id,
                        label: `${budget.name} - ${formatCurrency(getRemain(budget))} / ${formatCurrency(budget.amount)}`
                    }))
                )
            }
        }

        fetchWallets()
        fetchCategories()
        fetchBudgets()
    }, [getWallets, getCategories, getBudgets])

    const validateFieldRequired = (values) => {
        if (values.type === 'transfer') {
            if (!values.sourceWallet) {
                openNotification({title: 'Error', subtitle: `${p}.sourceWallet.error.required`, type: 'danger'})
                return false;
            }
            if (!values.targetWallet) {
                openNotification({title: 'Error', subtitle: `${p}.targetWallet.error.required`, type: 'danger'})
                return false;
            }
        } else {
            if (!values.wallet) {
                openNotification({title: 'Error', subtitle: `${p}.wallet.error.required`, type: 'danger'})
                return false;
            }
        }

        return true;
    }

    return (
        <div>
            <Formik
                innerRef={innerRef }
                initialValues={initialValues || {
                    type: '',
                    amount: '',
                    description: '',
                    date: new Date(),
                    wallet: '',
                    sourceWallet: '',
                    targetWallet: '',
                    category: '',
                    budget: '',
                    evidence: []
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true)
                    const success = validateFieldRequired(values)
                    if (!success) {
                        setSubmitting(false)
                        return
                    }
                    await onSubmit(values)
                    setSubmitting(false)
                }}
            >
                {({ touched, errors, resetForm, isSubmitting, values }) => (
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
                                            <div className="flex w-full items-center gap-3 flex-wrap">
                                                {typeOptions.map((item) => (
                                                    <Segment.Item value={item.value} key={item.value} disabled={isEditing}>
                                                        {({ ref, active, onSegmentItemClick, disabled }) => {
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
                                                                        customCheck={<HiCheckCircle className={`text-${themeColor}-${primaryColorLevel} absolute top-2 right-2 text-lg`} />}
                                                                    >
                                                                        <div className="w-full flex items-center pl-3 gap-3">
                                                                            <span className={`text-2xl ${active && `text-${themeColor}-${primaryColorLevel}`}`}>{item.icon}</span>
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

                            {
                                values?.type === 'transfer' ? (
                                    <>
                                        <FormItem
                                            label={t(`${p}.sourceWallet.label`)}
                                            invalid={errors.sourceWallet && touched.sourceWallet}
                                            errorMessage={t(`${p}${errors.sourceWallet}`)}
                                        >
                                            <Field name="sourceWallet">
                                                {({ field, form }) => (
                                                    <Select
                                                        placeholder={t(`${p}.sourceWallet.placeholder`)}
                                                        field={field}
                                                        form={form}
                                                        options={wallets.map((wallet) => ({ ...wallet, isDisabled: wallet.value === values.targetWallet }))} // disable target wallet
                                                        value={wallets.filter(
                                                            (option) =>
                                                                option.value ===
                                                                values.sourceWallet
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
                                            label={t(`${p}.targetWallet.label`)}
                                            invalid={errors.targetWallet && touched.targetWallet}
                                            errorMessage={t(`${p}${errors.targetWallet}`)}
                                        >
                                            <Field name="targetWallet">
                                                {({ field, form }) => (
                                                    <Select
                                                        placeholder={t(`${p}.targetWallet.placeholder`)}
                                                        field={field}
                                                        form={form}
                                                        options={wallets.map((wallet) => ({ ...wallet, isDisabled: wallet.value === values.sourceWallet }))} // disable target wallet
                                                        value={wallets.filter(
                                                            (option) =>
                                                                option.value ===
                                                                values.targetWallet
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
                                    </>
                                ) : (
                                    <>
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
                                    </>
                                )
                            }


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

                            <FormItem
                                label={t(`${p}.evidence.label`)}
                                invalid={errors.evidence && touched.evidence}
                                errorMessage={t(`${p}${errors.evidence}`)}
                            >
                                <Field name="evidence">
                                    {({ field, form }) => (
                                        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
                                            {values.evidence.map((evidence, index) => (
                                                <Image
                                                    key={index}
                                                    src={evidence}
                                                    className="w-full max-h-32 object-cover"
                                                    onDelete={
                                                        () => {
                                                            const newEvidence = values.evidence.filter((item, i) => i !== index);
                                                            form.setFieldValue(
                                                                field.name,
                                                                newEvidence
                                                            );
                                                        }
                                                    }
                                                />
                                            ))}

                                            <Upload
                                                onChange={(files) => handleUpload(files.pop(), (base64) => form.setFieldValue(field.name, [ ...values.evidence, base64 ]))}
                                                className="min-h-fit"
                                                showList={false}
                                                multiple={false}
                                                accept="image/*"
                                                draggable
                                            >
                                                <div className="max-w-full flex flex-col px-4 py-2 justify-center items-center">
                                                    <Loading loading={uploadingImage} type='cover'>
                                                        <ImageIcon mode={mode} />
                                                        <span>{t(`${p}.evidence.placeholder`)}</span>
                                                    </Loading>
                                                </div>
                                            </Upload>
                                        </div>
                                    )}
                                </Field>
                            </FormItem>
                            {/* </div> */}

                            {/* <StickyFooter
                                className="px-8 flex items-center justify-between py-4"
                                stickyClass="border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div className='mt-2'>
                                    <Button
                                        type="reset"
                                        className="ltr:mr-2 rtl:ml-2"
                                        variant="plain"
                                        onClick={() => {
                                            resetForm()
                                            onCancel()
                                        }}
                                    >
                                        {t(`${p}.cancel`)}
                                    </Button>
                                    <Button variant="solid" type="submit" loading={isSubmitting}>
                                        {isSubmitting ? t(`${p}.submit.loading`) : t(`${p}.submit.label`)}
                                    </Button>
                                </div>
                            </StickyFooter> */}
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default TransactionForm

const ImageIcon = ({ className, mode }) => (
    mode === 'light' ? (
        <img className={className} src="/img/others/upload.png" alt='upload' />
    ) : (
        <img className={className} src="/img/others/upload-dark.png" alt='upload' />
    )
)