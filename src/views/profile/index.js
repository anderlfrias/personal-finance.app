import { Container } from 'components/shared'
import { Card, Menu } from 'components/ui'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import UserInfo from './UserInfo'
import Password from './Password'
import Account from './Account'

const p = 'profile'
function Profile() {
    const { t } = useTranslation()
    const [activeKey, setActiveKey] = useState('userInfo')

    const onChangeMenu = (key) => {
        if (key === activeKey) return
        setActiveKey(key)
    }

    return (
        <>
            <Container>
                <div className='mb-6'>
                    <h2>
                        {t(`${p}.title`)}
                    </h2>
                </div>

                <Card className=''>
                <div className='grid lg:grid-cols-6 xl:grid-cols-4 2xl:grid-cols-6 gap-4 h-ful'>
                    <div className='2xl:col-span-1 xl:col-span-1 lg:col-span-2'>
                        <Menu defaultActiveKeys={[activeKey]} variant={'transparent'}>
                            <Menu.MenuItem className='mb-2' eventKey="userInfo" onSelect={onChangeMenu}>
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
                    <div className='2xl:col-span-5 lg:col-span-4 xl:col-span-3'>
                        <div>
                            {activeKey === 'userInfo' && <UserInfo />}
                            {activeKey === 'password' && <Password />}
                            {activeKey === 'account' && <Account />}
                        </div>
                    </div>
                </div>
                </Card>
            </Container>
        </>
    )
}

export default Profile