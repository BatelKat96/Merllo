import { Link } from 'react-router-dom'

import { UserMsg } from '../user-msg.jsx'

export function HomePageFooter() {
	return (
		<footer className="homepage-footer">
			footer in construction <br></br>
			<Link to="/about"> about us</Link>
			<UserMsg />
		</footer>
	)
}
