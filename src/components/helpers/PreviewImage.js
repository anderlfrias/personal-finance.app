import { Dialog } from 'components/ui'
import React from 'react'

function PreviewImage({ isOpen, onClose, image }) {
    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onClose}
        >
            <div className="flex flex-col h-full justify-between mt-6 custom-scroll">
                <div className="max-h-96 overflow-y-auto rounded-md">
                    <img src={image} alt="imagen" className="w-full h-full object-cover" />
                </div>
            </div>
        </Dialog>
    )
}

export default PreviewImage