import React from "react";
import { useTranslation } from "react-i18next";
import ModeSwitcher from "./ModeSwitcher";
import ColorSwitcher from "./ColorSwitcher";

const p = 'settings'
function Settings() {
    const { t } = useTranslation()
    return (
        <>
            <div className="container mx-auto">
                <div className='mb-6'>
                    <h2 className='font-bold'>{t(`${p}.title`)}</h2>
                    <p className='text-sm text-gray-500'>{t(`${p}.subtitle`)}</p>
                </div>

                <div className="flex flex-col gap-y-6 mb-6">
                    <div>
                        <div className="mb-3">
                            <h6>
                                {t(`${p}.mode.title`)}
                            </h6>
                        </div>
                        <ModeSwitcher />
                    </div>

                    <div>
                        <div className="mb-3">
                            <h6>
                                {t(`${p}.color.title`)}
                            </h6>
                        </div>
                        <ColorSwitcher />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings