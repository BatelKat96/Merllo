import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { UserMsg } from './user-msg.jsx'

export function HomePageFooter() {
	return (
		<footer className="homepage-footer">
			footer in construction <br></br>
			<Link to="/about"> about us</Link>
			<UserMsg />
		</footer>
	)
}
