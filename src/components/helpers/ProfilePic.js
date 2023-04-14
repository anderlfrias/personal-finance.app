import { Avatar } from 'components/ui'
import React from 'react'
import { HiOutlineUser } from 'react-icons/hi'

function ProfilePic({ className, image, size }) {
    if (image) {
        return (
            <div className={className} >
                <Avatar shape="circle" size={size} src={image} />
            </div>
        )
    }

    return (
        <div className={className} >
            <Avatar shape="circle" size={size}  icon={<HiOutlineUser />}  />
        </div>
    )
}

export default ProfilePic