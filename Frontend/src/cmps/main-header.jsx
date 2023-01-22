import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'

import { BoardCreate } from './board-create'
import { boardService } from '../services/board.service'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'

import { ReactComponent as AppsSvg } from '../assets/img/icons-header/apps.svg'
import { ReactComponent as CreateSvg } from '../assets/img/icons-header/create.svg'
import { ReactComponent as DownSvg } from '../assets/img/icons-header/down.svg'
import { ReactComponent as HelpSvg } from '../assets/img/icons-header/help.svg'
import { ReactComponent as NotificationSvg } from '../assets/img/icons-header/notification.svg'
import { ReactComponent as SearchSvg } from '../assets/img/icons-header/search.svg'
import { ReactComponent as TrelloSvg } from '../assets/img/icons-header/trello.svg'
import { ReactComponent as UserSvg } from '../assets/img/icons-header/user.svg'

export function MainHeader() {
	const [isBoardComposerOpen, setIsBoardComposerOpen] = useState(false)
	const [boardToEdit, setBoardToEdit] = useState(boardService.getEmptyBoard())

	function openBoardComposer() {
		setIsBoardComposerOpen(true)
	}

	function closeBoardComposer() {
		setIsBoardComposerOpen(false)
		setBoardToEdit(boardService.getEmptyBoard())
	}

	return (
		<header className="main-header">
			<div className="right-nav">
				<button>
					<AppsSvg />
				</button>

				<NavLink to="/" className="header-logo">
					<TrelloSvg />
					<h1 className="merllo-logo">Merllo</h1>
				</NavLink>

				<button>
					Workspaces
					<DownSvg />
				</button>

				<button>
					Recent
					<DownSvg />
				</button>

				<button>
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

				<button>
					<HelpSvg />
				</button>

				<button>
					<UserSvg />
				</button>
			</div>
			{isBoardComposerOpen && (
				<BoardCreate closeBoardComposer={closeBoardComposer} />
			)}
		</header>
	)
}
