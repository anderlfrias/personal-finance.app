import React, { cloneElement } from 'react'
import { Container } from 'components/shared'
import { Card } from 'components/ui'
import Logo from 'components/template/Logo'
import LanguageSelector from 'components/template/LanguageSelector'

const Simple = ({children, content, ...rest }) => {
	return (
		<div className="relative min-h-full">
			<div className='absolute right-2 top-2'>
					<LanguageSelector />
				</div>
			<Container className="flex flex-col flex-auto items-center justify-center min-w-0 min-h-full">
				<Card className="min-w-[320px] md:min-w-[450px] max-w-[640px]" bodyClass="md:p-10">
					<div className="text-center">
						<Logo type="streamline" imgClass="mx-auto" />
					</div>
					<div className="text-center">
						{content}
						{children ? cloneElement(children, {contentClassName: 'text-center', ...rest }) : null}
					</div>
				</Card>
			</Container>
		</div>
	)
}

export default Simple