import { NavLink } from 'react-router-dom'

import { AiFillGithub } from 'react-icons/ai'

export function HomePageFooter() {
	return (
		<footer className="homepage-footer">
			<small>
				Trello clone project by

				<a href="https://github.com/BatelKat96" target="_blank">
					<AiFillGithub className='git-icon' />
				</a>

				<a href="https://github.com/Drorka" target="_blank">
					<AiFillGithub className='git-icon' />
				</a>

				<a href="https://github.com/beta0022" target="_blank">
					<AiFillGithub className='git-icon' />
				</a>
			</small>
		</footer>
	)
}
