import { Button, Drawer } from "components/ui";
import React from "react";
import { HiOutlineTrash } from "react-icons/hi";
import useScreenSize from 'utils/hooks/custom/useScreenSize'

function DrawerDetails(props) {
    const {
        children,
        isOpen,
        title,
        subtitle,
        closeText,
        editText,
        deleteText,
        onEdit,
        onClose,
        onDelete
    } = props;
    const { width: screenWidth } = useScreenSize()

    const Title = (
        <div className="">
            <h4>{title}</h4>
            <div className="flex">
                <p className="text-gray-500">{subtitle}</p>
            </div>
        </div>
    )

    const Footer = (
        <div className="flex justify-between w-full">
            <Button size="sm" variant='solid' color='red-500' icon={<HiOutlineTrash />} className="mr-2" onClick={onDelete}>
                {deleteText}
            </Button>
            <div>
                <Button size="sm" className="mr-2" onClick={onClose}>
                    {closeText}
                </Button>
                <Button size="sm" variant="solid" onClick={onEdit}>
                    {editText}
                </Button>
            </div>
        </div>
    )

    return (
        <>
            <Drawer
                title={Title}
                isOpen={isOpen}
                onClose={onClose}
                onRequestClose={onClose}
                footer={Footer}
                width={ screenWidth >= 768 ? 500 : screenWidth}
            >
                {children}
            </Drawer>
        </>
    )
}

export default DrawerDetails