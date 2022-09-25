import React from 'react'
import { Navbar } from './Navbar'

export const Layout = ({ children }) => {
	return (
		<React.Fragment>
			<Navbar />
			<div className='container mx-auto px-2'>{children}</div>
		</React.Fragment>
	)
}
