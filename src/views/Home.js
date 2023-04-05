import OverallChart from 'components/charts/OverallChart'
import React from 'react'
import { useTranslation } from 'react-i18next'

const p = 'home'
const Home = () => {
	const { t } = useTranslation()
	return (
		<>
			<div className='container mx-auto'>
                <div className='mb-4'>
                    <h2>
                        {t(`${p}.title`)}
                    </h2>
					<p>
						{t(`${p}.welcome`)}
					</p>
				</div>

				<div className='mb-4'>
					<OverallChart />
				</div>
			</div>
		</>
	)
}

export default Home