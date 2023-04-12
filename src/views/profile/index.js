import { Container } from 'components/shared'
import { Card, Menu } from 'components/ui'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const p = 'profile'
function Profile() {
    const { t } = useTranslation()
    const [activeKey, setActiveKey] = useState('personal-data')

    const onChangeMenu = (key) => {
        if (key === activeKey) return
        setActiveKey(key)
    }
    return (
        <>
            <Container>
                <h2>
                    {t(`${p}.title`)}
                </h2>

                <Card>
                <div className='grid lg:grid-cols-5 xl:grid-cols-3 2xl:grid-cols-5 gap-4 h-full'>
                    <div className='2xl:col-span-1 xl:col-span-1 lg:col-span-2'>
                        <Menu defaultActiveKeys={[activeKey]}>
                            <Menu.MenuItem className='mb-2' eventKey="personal-data" onSelect={onChangeMenu}>
                                {t(`${p}.menu.personalData`)}
                            </Menu.MenuItem>
                            <Menu.MenuItem className='mb-2' eventKey="password" onSelect={onChangeMenu}>
                                {t(`${p}.menu.password`)}
                            </Menu.MenuItem>
                            <Menu.MenuItem className='mb-2' eventKey="account" onSelect={onChangeMenu}>
                                {t(`${p}.menu.account`)}
                            </Menu.MenuItem>
                        </Menu>
                    </div>
                    <div className='2xl:col-span-4 lg:col-span-3 xl:col-span-2'>
                    </div>
                </div>
                </Card>
            </Container>
        </>
    )
}

export default Profile