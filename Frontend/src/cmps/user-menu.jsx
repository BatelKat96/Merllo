import { useSelector } from 'react-redux'
import { useState } from 'react'
import { boardService } from '../services/board.service'

import { IoClose } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { BiCheck } from 'react-icons/bi'

export function UserMenu({ user, logout, closeUserMenu }) {
	const navigate = useNavigate()

	return (
		<section className="user-menu">
			<div className="user-menu-header">
				<h2>Account</h2>
				<button className="btn-user-menu close" onClick={closeUserMenu}>
					<IoClose className="icon-close" />
				</button>
			</div>

			<div className="user-menu-content">
				<div className="user-menu-preview">
					<div className="user-img">
						<img src={user.imgUrl} alt="" />
					</div>
					<div className="user-name">{user.fullname}</div>
				</div>
				<hr className="user-menu-separator" />
				<a className="user-menu-logout" onClick={logout}>
					Logout
				</a>
			</div>
		</section>
	)
}
