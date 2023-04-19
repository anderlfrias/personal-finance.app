import { ActionLink, Loading } from 'components/shared'
import { Button } from 'components/ui'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useParams } from 'react-router-dom'
import useAuth from 'utils/hooks/useAuth'

const p = 'sendConfirmEmail'
function SendConfirmationEmail() {
    const { token } = useParams()
    const { state } = useLocation()
    const { t } = useTranslation()
    const { sendConfirmEmail } = useAuth()
    const [loading, setLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)

    const hideEmail = (email) => {
        const emailArray = email.split('@')
        const emailLength = emailArray[0].length
        const hideEmail = emailArray[0].substring(0, 2) + '*'.repeat(emailLength - 2) + '@' + emailArray[1]
        return hideEmail
    }

    const onResendEmail = async() => {
        await sendEmail(token)
    }

    const innerHtml = (text, elementId) => {

        const element = document.getElementById(elementId)

        if (element && text) element.innerHTML = text
    }

    const sendEmail = useCallback(async () => {
        setLoading(true)
        const resp = await sendConfirmEmail(token)
        if (resp.status === 'success') {
            setEmailSent(true)
        }
        setLoading(false)
    }, [sendConfirmEmail, token])

    useEffect(() => {
        !emailSent && sendEmail()
        if (state) {
            const text = t(`${p}.message`).replace('{email}', hideEmail(state.email))
            innerHtml(text, 'message')
        }
    }, [emailSent, sendEmail, state, t])

    return (
        <>
            <Loading loading={loading}>
            <div className="mb-8">
				<h3 className="mb-1">{t(`${p}.title`)}</h3>
				<p id='message'>
                    {/* {t(`${p}.message`).replace('{email}', hideEmail(state.email))} */}
                </p>
			</div>

            <Button className="mb-2" variant="solid" onClick={onResendEmail} disabled={loading}>
                {t(`${p}.resendEmail`)}
            </Button>
            <div className="text-center">
				<span>{t(`${p}.login`)} </span>
				<ActionLink to={'/login'}>
					{t(`${p}.loginLink`)}
				</ActionLink>
			</div>
            </Loading>
        </>
    )
    }

export default SendConfirmationEmail