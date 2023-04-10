import { Loading } from 'components/shared'
import { Avatar, Button } from 'components/ui'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiCheck } from 'react-icons/hi'
import { useNavigate, useParams } from 'react-router-dom'
import useAuth from 'utils/hooks/useAuth'
import jwt_decode from "jwt-decode";

const p = 'confirmEmail'
function Confirmpassword() {
    const navigate = useNavigate()
    const { token } = useParams()
    const { t } = useTranslation()
    const { confirmEmail } = useAuth()
    const [loading, setLoading] = useState(true)
    const [emailConfirmed, setEmailConfirmed] = useState(false)

    const onClick = () => {
        navigate('/sign-in')
    }

    useEffect(() => {
        const confirm = async () => {
            setLoading(true)
            const resp = await confirmEmail(token)
            console.log(resp)
            if (resp.status === 'success') {
                setEmailConfirmed(true)
                console.log('email confirmed')
            }
            setLoading(false)
        }

        !emailConfirmed && confirm()
    }, [token, confirmEmail, emailConfirmed])
    return (
        <>
            <Loading loading={loading}>
                {
                    emailConfirmed &&
                    <div className="mb-8">
                        <h3 className="mb-1">{t(`${p}.success.title`)}</h3>
                        <p>{t(`${p}.success.subtitle`)}</p>
                        <p>{t(`${p}.success.message`)}</p>

                        {/* <Avatar shape="circle" size='lg' className="mt-4 mr-4 bg-emerald-500" icon={<HiCheck />} /> */}

                        {/* Volver al login */}

                        <Button className="mt-4" variant="solid" onClick={onClick}>
                            {t(`${p}.success.login`)}
                        </Button>
                    </div>
                }
            </Loading>
        </>
    )
}

export default Confirmpassword