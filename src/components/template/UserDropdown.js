import React from 'react'
import { Avatar, Dropdown } from 'components/ui'
import withHeaderItem from 'utils/hoc/withHeaderItem'
import useAuth from 'utils/hooks/useAuth'
// import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineUser, HiOutlineLogout, HiOutlineCog } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import ProfilePic from 'components/helpers/ProfilePic'

const dropdownItemList = [
	{
		label: 'profile',
		path: '/profile',
		icon: <HiOutlineUser />,
	},
	{
		label: 'settings',
		path: '/settings',
		icon: <HiOutlineCog />,
	}
]

const p = 'header'
export const UserDropdown = ({ className }) => {
	const { t } = useTranslation()
	// bind this
	const userInfo = useSelector((state) => state.auth.user)

	const { signOut } = useAuth()

	const UserAvatar = (
		<div className={classNames(className, 'flex items-center gap-2')}>
			{/* <Avatar size={32} shape="circle" icon={<HiOutlineUser />} /> */}
			<ProfilePic className="w-8 h-8" image={userInfo.profilePic} size={32} />
			<div className="hidden md:block">
				{/* <div className="text-xs capitalize">admin</div> */}
				<div className="font-bold">{userInfo.username}</div>
			</div>
		</div>
	)

	return (
		<div>
			<Dropdown menuStyle={{minWidth: 240}} renderTitle={UserAvatar} placement="bottom-end">
				<Dropdown.Item variant="header">
					<div className="py-2 px-3 flex items-center gap-2">
						<Avatar shape="circle" icon={<HiOutlineUser />} />
						<div>
							<div className="font-bold text-gray-900 dark:text-gray-100">{userInfo.name}  {userInfo.firstSurname}</div>
							<div className="text-xs"> {userInfo.email}</div>
						</div>
					</div>
				</Dropdown.Item>
				<Dropdown.Item variant="divider" />
				{dropdownItemList.map(item => (
					<Dropdown.Item eventKey={item.label} key={item.label} className="mb-1">
						<Link className="flex gap-2 items-center w-full" to={item.path}>
							<span className="text-xl opacity-50">{item.icon}</span>
							<span>{t(`${p}.${item.label}`)}</span>
						</Link>
					</Dropdown.Item>
				))}
				<Dropdown.Item variant="divider" />
				<Dropdown.Item onClick={signOut} eventKey="Sign Out" className="gap-2">
					<span className="text-xl opacity-50">
						<HiOutlineLogout />
					</span>
					<span>{t(`${p}.logout`)}</span>
				</Dropdown.Item>
			</Dropdown>
		</div>
	)
}

export default withHeaderItem(UserDropdown)
