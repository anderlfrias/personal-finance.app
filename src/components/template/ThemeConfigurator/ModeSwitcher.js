import React, { useCallback } from 'react'
import useDarkMode from 'utils/hooks/useDarkMode'
import { Switcher } from 'components/ui'
import { RiMoonClearLine, RiSunLine } from 'react-icons/ri'
import withHeaderItem from 'utils/hoc/withHeaderItem'
// import classNames from 'classnames'

const withIcon = (component) => {
    return <div className="text-lg">{component}</div>
}

const ModeSwitcher = () => {

	const [isDark, setIsDark] = useDarkMode()

	const onSwitchChange = useCallback((checked) => {
		setIsDark(checked ? 'dark' : 'light')
	}, [setIsDark])

	return (
		<div>
			<Switcher
				defaultChecked={isDark}
				onChange={checked => onSwitchChange(checked)}
				unCheckedContent={withIcon(<RiMoonClearLine />)}
                checkedContent={withIcon(<RiSunLine />)}
			/>
			{/* {
				isDark ? (
					<button className={classNames('text-2xl')} onClick={() => onSwitchChange(true)}>
						<RiSunLine />
					</button>
				) : (
					<button className={classNames('text-2xl')} onClick={() => onSwitchChange(false)}>
						<RiMoonClearLine />
					</button>
				)
			} */}
		</div>
	)
}

export default withHeaderItem(ModeSwitcher)
