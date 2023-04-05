import React from "react";
import { MODE_DARK, MODE_LIGHT } from 'constants/theme.constant'
import { Segment, useConfig } from "components/ui";
import {  SegmentItemOption } from "components/shared";
import { HiCheckCircle } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import useDarkMode from "utils/hooks/useDarkMode";

const modes = [
	{
		value: MODE_DARK,
		label: 'dark',
		src: '/img/thumbs/layouts/classic-dark.jpg',
	},
    {
        value: MODE_LIGHT,
        label: 'light',
        src: '/img/thumbs/layouts/classic.jpg'
    }
]

const p = 'settings.mode'
function ModeSwitcher() {
    const { t } = useTranslation()
    const { themeColor, primaryColorLevel } = useConfig()
    const [isDark, setIsDark] = useDarkMode()

    const onChangeMode = (values) => setIsDark(values[0])


    return (
        <>
            <Segment className="w-full" value={isDark ? [MODE_DARK] : [MODE_LIGHT]} onChange={onChangeMode}>
				<div className="flex gap-4">
					{modes.map((mode) => (
						<Segment.Item value={mode.value} key={mode.value}>
							{
								({ref, active, onSegmentItemClick, disabled}) => {
									return (
										<div className="text-center max-w-[150px]">
											<SegmentItemOption
												hoverable
												ref={ref}
												active={active}
												disabled={disabled}
												defaultGutter={false}
												onSegmentItemClick={onSegmentItemClick}
												className="relative min-h-[50px] w-full"
												customCheck={
													<HiCheckCircle className={`absolute top-2 right-2 text-lg text-${themeColor}-${primaryColorLevel}`} />
												}
											>
												<img
													className="rounded-md"
                                                    src={mode.src}
                                                    alt=''
                                                />
											</SegmentItemOption>
											<div className='mt-2 font-semibold'>
												{t(`${p}.${mode.label}`)}
											</div>
										</div>
									)
								}
							}
						</Segment.Item>
					))}
				</div>
			</Segment>
        </>
    )
}

export default ModeSwitcher;