import { Button } from 'components/ui'
import React from 'react'
import { HiPlus } from 'react-icons/hi'

function CreateButton({ onClick }) {
    return (
        <>
            <Button
                className="sm:hidden fixed bottom-4 right-4 drop-shadow-2xl"
                icon={<HiPlus />}
                onClick={onClick}
                variant="solid"
                shape="circle"
                size="lg"
            />
        </>
    )
}

export default CreateButton