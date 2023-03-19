import React from 'react'
import useDarkMode from 'utils/hooks/useDarkMode'
// import { Switcher } from 'components/ui'
import { RiMoonClearLine, RiSunLine } from 'react-icons/ri'
import withHeaderItem from 'utils/hoc/withHeaderItem'
import classNames from 'classnames'

// const withIcon = (component) => {
//     return <div className="text-lg">{component}</div>
// }

const ModeSwitcher = ({className, ...rest }) => {

	const [isDark, setIsDark] = useDarkMode()

	// const onSwitchChange = useCallback((checked) => {
	// 	setIsDark(checked ? 'dark' : 'light')
	// }, [setIsDark])


	const onSwitchChange = (dark) => {
		setIsDark(dark ? 'dark' : 'light')
	}

	return (
		<>
			{/* <Switcher
				defaultChecked={isDark}
				onChange={checked => onSwitchChange(checked)}
				unCheckedContent={withIcon(<RiMoonClearLine />)}
                checkedContent={withIcon(<RiSunLine />)}
			/> */}
			{
				isDark ? (
					<div className={classNames('text-2xl', className)} onClick={() => onSwitchChange(false)} {...rest}>
						<RiSunLine />
					</div>
				) : (
					<div className={classNames('text-2xl', className)} onClick={() => onSwitchChange(true)} {...rest}>
						<RiMoonClearLine />
					</div>
				)
			}
		</>
	)
}

export default withHeaderItem(ModeSwitcher)
