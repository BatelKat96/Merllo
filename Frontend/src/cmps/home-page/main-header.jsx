import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'

import { BoardCreate } from '../board-create'
import { UserMenu } from '../user-menu'
import { logout } from '../../store/user.actions'
import { boardService } from '../../services/board.service'

import { ReactComponent as AppsSvg } from '../../assets/img/icons-header/apps.svg'
import { ReactComponent as CreateSvg } from '../../assets/img/icons-header/create.svg'
import { ReactComponent as DownSvg } from '../../assets/img/icons-header/down.svg'
import { ReactComponent as HelpSvg } from '../../assets/img/icons-header/help.svg'
import { ReactComponent as NotificationSvg } from '../../assets/img/icons-header/notification.svg'
import { ReactComponent as SearchSvg } from '../../assets/img/icons-header/search.svg'
import { ReactComponent as TrelloSvg } from '../../assets/img/icons-header/trello.svg'
import { ReactComponent as UserSvg } from '../../assets/img/icons-header/user.svg'

export function MainHeader() {
	const [isBoardComposerOpen, setIsBoardComposerOpen] = useState(false)
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
	const [boardToEdit, setBoardToEdit] = useState(boardService.getEmptyBoard())
	const user = useSelector((storeState) => storeState.userModule.user)

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
	}
	function closeUserMenu() {
		setIsUserMenuOpen(false)
	}

	console.log('user', user)

	return (
		<header className="main-header">
			<div className="logo-nav">
				<button>
					<AppsSvg />
				</button>

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

				<button className="nav-btn">
					Recent
					<DownSvg />
				</button>

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
				<button className="search">
					<SearchSvg />
					Search
				</button>

				<button>
					<NotificationSvg />
				</button>
				{/*
				<button>
					<HelpSvg />
				</button> */}

				<button onClick={openUserMenu}>
					{/* <UserSvg /> */}
					<img
						className="member-img"
						src={require(`../../assets/img/members-task-details/batel.png`)}
					/>
				</button>
			</div>
			{isBoardComposerOpen && (
				<BoardCreate closeBoardComposer={closeBoardComposer} />
			)}
			{user && isUserMenuOpen && (
				<UserMenu user={user} logout={logout} closeUserMenu={closeUserMenu} />
			)}
		</header>
	)
}
