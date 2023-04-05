import { Button } from 'components/ui'
import React from 'react'
import { HiOutlineCheck } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { setThemeColor } from 'store/theme/themeSlice'

const colorList = [
	{ label: 'Default', value: 'indigo' },
	{ label: 'Orange', value: 'orange' },
	{ label: 'Green', value: 'green' },
	{ label: 'Cyan', value: 'cyan' },
	// { label: 'Sky', value: 'sky' },
	{ label: 'Blue', value: 'blue' },
	{ label: 'Rose', value: 'rose' }
]

function ColorSwitcher() {
	const dispatch = useDispatch()
	const themeColor = useSelector((state) => state.theme.themeColor)

    const isCurrentColor = (color) => {
        return themeColor === color
    }

    const onChangeColor = (color) => {
        dispatch(setThemeColor(color))
    }
    return (
        <>
            <div className='flex gap-3'>
                <div className='flex flex-wrap gap-2'>
                    {colorList.map((color, index) => (
                        <Button
                            key={index}
                            icon={isCurrentColor(color.value) ? <HiOutlineCheck /> : <></>}
                            onClick={() => onChangeColor(color.value)}
                            active={isCurrentColor(color.value)}
                            color={color.value}
                            variant='solid'
                            shape='circle'
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default ColorSwitcher