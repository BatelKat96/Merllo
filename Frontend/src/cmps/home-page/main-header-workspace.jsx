import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { BoardCreate } from '../board/board-create'
import { boardService } from '../../services/board.service'
import { logout } from '../../store/user.actions.js'
import { UserMenu } from '../board/user-menu'

import { ReactComponent as DownSvg } from '../../assets/img/icons-header/down.svg'
import { ReactComponent as TrelloSvg } from '../../assets/img/icons-header/trello.svg'

export function MainHeaderWorkspace() {
	const [isBoardComposerOpen, setIsBoardComposerOpen] = useState(false)
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
	const [boardToEdit, setBoardToEdit] = useState(boardService.getEmptyBoard())
	const user = useSelector((storeState) => storeState.userModule.user)
	const navigate = useNavigate()

	// create board
	function openBoardComposer() {
		setIsBoardComposerOpen(true)
	}
	function closeBoardComposer() {
		setIsBoardComposerOpen(false)
		setBoardToEdit(boardService.getEmptyBoard())
	}

	// user
	function openUserMenu() {
		setIsUserMenuOpen(true)
		console.log(user)
	}
	function closeUserMenu() {
		setIsUserMenuOpen(false)
	}

	function onLogout() {
		logout()
		navigate(`/`)
	}

	return (
		<header className="main-header-demo">
			<div className="logo-nav">
				{/* <button>
					<AppsSvg />
				</button> */}

				<NavLink to="/" className="header-logo">
					<TrelloSvg />
					<h1 className="merllo-logo">Merllo</h1>
				</NavLink>

				<NavLink to="/workspace">
					<button className="nav-btn">
						Boards
						<DownSvg />
					</button>
				</NavLink>

				{/* <button className="nav-btn">
					Recent
					<DownSvg />
				</button> */}

				<button className="nav-btn">
					Starred
					<DownSvg />
				</button>

				<button className="create-btn" onClick={openBoardComposer}>
					Create
					{/* <CreateSvg /> */}
				</button>
			</div>

			<div className="left-nav">
				{/* <button className="search">
					<SearchSvg />
					Search
				</button> */}

				{/* <button>
					<NotificationSvg />
				</button> */}

				{/* <button>
					<HelpSvg />
				</button> */}

				{user && (
					<button className="btn-member-img" onClick={openUserMenu}>
						{/* <UserSvg /> */}
						<img
							className="member-img"
							src={user.imgUrl}
							alt={user.fullname}
							style={{ borderRadius: '50%' }}
						/>
					</button>
				)}
			</div>
			{isBoardComposerOpen && (
				<BoardCreate closeBoardComposer={closeBoardComposer} />
			)}
			{user && isUserMenuOpen && (
				<UserMenu
					user={user}
					onLogout={onLogout}
					closeUserMenu={closeUserMenu}
				/>
			)}
		</header>
	)
}
