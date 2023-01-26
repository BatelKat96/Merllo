import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { BoardCreate } from '../board-create'
import { UserMenu } from '../user-menu'
import { logout } from '../../store/user.actions'
import { boardService } from '../../services/board.service'

import Loader from '../../assets/img/loader.svg'
import { ReactComponent as AppsSvg } from '../../assets/img/icons-header/apps.svg'
import { ReactComponent as CreateSvg } from '../../assets/img/icons-header/create.svg'
import { ReactComponent as DownSvg } from '../../assets/img/icons-header/down.svg'
import { ReactComponent as HelpSvg } from '../../assets/img/icons-header/help.svg'
import { ReactComponent as NotificationSvg } from '../../assets/img/icons-header/notification.svg'
import { ReactComponent as SearchSvg } from '../../assets/img/icons-header/search.svg'
import { ReactComponent as TrelloSvg } from '../../assets/img/icons-header/trello.svg'
import { ReactComponent as UserSvg } from '../../assets/img/icons-header/user.svg'
import { AiFillDiff } from 'react-icons/ai'

export function MainHeader() {
	const board = useSelector((storeState) => storeState.boardModule.board)
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

	function getHeaderStyle() {
		if (!board.style) return { backgroundColor: `#046AA7` }
		if (board?.style.backgroundColor) {
			return {
				backgroundColor: `${board.style.backgroundColor}`,
			}
		}
		return {
			backgroundColor: `#046AA7`,
		}
	}

	function getHeaderTxtStyle({ backgroundColor }) {
		var r = parseInt(backgroundColor.substring(1, 3), 16)
		var g = parseInt(backgroundColor.substring(3, 5), 16)
		var b = parseInt(backgroundColor.substring(5, 7), 16)
		var yiq = (r * 299 + g * 587 + b * 114) / 1000
		// console.log('yiq', yiq)
		// console.log('yiq >= 128', yiq >= 128)
		return yiq >= 128 ? 'light-bg' : 'dark-bg'
	}

	if (!board)
		return (
			<div className="loader-wrapper">
				<img className="loader" src={Loader} alt="loader" />
			</div>
		)
	const headerStyle = getHeaderStyle()
	const txtStyle = getHeaderTxtStyle(headerStyle)

	return (
		<header className={`main-header-${txtStyle}`} style={headerStyle}>
			<span className="fade">
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

					{user && (
						<button className="btn-member-img" onClick={openUserMenu}>
							{/* <UserSvg /> */}
							<img
								className="member-img"
								src={user.imgUrl}
								alt={user.fullname}
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
			</span>
		</header>
	)
}
