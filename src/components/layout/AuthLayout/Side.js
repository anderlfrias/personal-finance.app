import React, { cloneElement } from 'react'
import { Avatar } from 'components/ui'
import Logo from 'components/template/Logo'
import { APP_NAME } from 'constants/app.constant'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Tdata from "./Tdata"
import LanguageSelector from 'components/template/LanguageSelector'

const Side = ({children, content, ...rest }) => {
	const settings = {
		dots: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
	}
	return (
		<div className="grid lg:grid-cols-3 h-full">
			<div
				className="bg-no-repeat bg-cover py-6 px-16 flex-col justify-between hidden lg:flex" 
				style={{backgroundImage: `url('/img/others/auth-side-bg.jpg')`}}
			>
				<Logo mode="dark" />
				<Slider {...settings}>
					{Tdata.map((value, index) => {
						return(
							<div key={index} >
								<div className="mb-6 flex items-center gap-4">
									<Avatar className="border-2 border-white" shape="circle" src={value.img}/>
									<div className="text-white">
										<div className="font-semibold text-base">{value.nom}</div>
										<span className="opacity-80">{value.desc}</span>
									</div>
								</div>
								<p className="text-lg text-white opacity-80">"{value.phase}</p>
							</div>
						)
					})}
				</Slider>
				<span className="text-white">Copyright  &copy;  {`${new Date().getFullYear()}`} <span className="font-semibold">{`${APP_NAME}`}</span> </span>
			</div>

			<div className="relative col-span-2 flex flex-col justify-center items-center bg-white dark:bg-gray-800">
				<div className='absolute right-2 top-2'>
					<LanguageSelector />
				</div>
				<div className="xl:min-w-[450px] px-8">
					<div className="mb-8">
						{content}
					</div>
					{children ? cloneElement(children, { ...rest }) : null}
				</div>
			</div>
		</div>
	)
}

export default Side