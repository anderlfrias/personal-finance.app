import React from 'react'
import { Radio } from 'components/ui'
import { useSelector, useDispatch } from 'react-redux'
import { setNavMode } from 'store/theme/themeSlice'
import {
	NAV_MODE_THEMED
} from 'constants/theme.constant'
import { useTranslation } from 'react-i18next'

const NavModeSwitcher = () => {
	const { t } = useTranslation()
	const navMode = useSelector((state) => state.theme.navMode)
	const dispatch = useDispatch()

	const onSetNavMode = (val) => {
		dispatch(setNavMode(val))
	}

	return (
		<Radio.Group
			value={navMode === NAV_MODE_THEMED ? NAV_MODE_THEMED : 'default'}
			onChange={val => onSetNavMode(val)}
		>
			<Radio value="default">{t('settings.nav.default')}</Radio>
			<Radio value={NAV_MODE_THEMED}>{t('settings.nav.themed')}</Radio>
		</Radio.Group>
	)
}

export default NavModeSwitcher