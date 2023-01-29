import { NavLink } from 'react-router-dom'

import { AiFillGithub } from 'react-icons/ai'

export function HomePageFooter() {
	return (
		<footer className="homepage-footer">
			<small>
				Trello clone project by

				<NavLink to="https://github.com/BatelKat96">
					<AiFillGithub className='git-icon' />
				</NavLink>

				<NavLink to="https://github.com/Drorka">
					<AiFillGithub className='git-icon' />
				</NavLink>

				<NavLink to="https://github.com/beta0022">
					<AiFillGithub className='git-icon' />
				</NavLink>
			</small>
		</footer>
	)
}
