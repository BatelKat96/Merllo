import { Fragment, useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadBoard, removeBoard, updateBoard } from '../store/board.actions'

import { HiOutlineStar } from 'react-icons/hi2'
import { BsFilter } from 'react-icons/bs'
import { MdDeleteOutline, MdDelete } from 'react-icons/md'

import { GroupList } from '../cmps/group-list'

import Loader from '../assets/img/loader.svg'
import { BoardSideMenu } from '../cmps/board-side-menu'
import { FiSunset } from 'react-icons/fi'

export function Board() {
	const { boardId } = useParams()
	const board = useSelector((storeState) => storeState.boardModule.board)
	const [boardTitle, setBoardTitle] = useState('')
	const [titleWidth, setTitleWidth] = useState(null)
	const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		loadTheBoard(boardId)
	}, [boardId])

	async function loadTheBoard(boardId) {
		try {
			const board = await loadBoard(boardId)
			setBoardTitle(board.title)
			setTitleWidth(board.title.length * 10 + 40)
		} catch (err) {
			console.log('Failed to load the board')
		}
	}

	function handleEditBoardTitle({ target }) {
		setBoardTitle(target.value)
		setTitleWidth(boardTitle.length * 10 + 40)
	}

	async function onSaveBoardTitle() {
		if (!boardTitle) return
		board.title = boardTitle
		try {
			await updateBoard(board)
		} catch (err) {
			console.log('Failed to update board title', err)
		}
	}

	async function handleKey(ev) {
		if (ev.code === 'Enter') {
			ev.preventDefault()
			handleEditBoardTitle(ev)
			onSaveBoardTitle()
			ev.target.blur()
		}
	}

	async function onRemoveBoard() {
		try {
			await removeBoard(board._id)
			navigate(`/workspace`)
		} catch (err) {
			console.log('Cannot remove board', err)
		}
	}

	async function onToggleStar() {
		board.isStarred = !board.isStarred
		try {
			await updateBoard(board)
			console.log('success')
		} catch (err) {
			console.log('Cannot update board', err)
		}
	}

	function onToggleSideMenu() {
		setIsSideMenuOpen(!isSideMenuOpen)
	}

	async function changeBackground({ background, backgroundColor, thumbnail }) {
		board.style = { background, backgroundColor, thumbnail }
		try {
			await updateBoard(board)
		} catch (err) {
			console.log('Failed to update board background', err)
		}
	}

	function getBoardStyle() {
		if (!board.style) return
		if (board?.style.background) {
			return {
				background: `url("${board.style.background}") center center / cover`,
			}
		} else if (board?.style.backgroundColor) {
			return { backgroundColor: `${board.style.backgroundColor}` }
		}
		return { backgroundColor: `#0067a3` }
	}

	if (!board) return <img className="loader" src={Loader} alt="loader" />
	const boardStyle = getBoardStyle()

	return (
		<section className="board" style={boardStyle}>
			<div className="board-top-menu">
				<div className="board-title">
					<input
						onBlurCapture={onSaveBoardTitle}
						name="title"
						className="edit-group-title"
						id={board.id}
						spellCheck="false"
						defaultValue={board.title}
						onChange={handleEditBoardTitle}
						onKeyDown={handleKey}
						style={{ width: `${titleWidth}px` }}
					></input>
				</div>

				<button
					className={`btn-board star-${board.isStarred}`}
					onClick={onToggleStar}
					title="Click to star or unstar this board. Starred boards show up at the top of your boards list."
				>
					<HiOutlineStar />
				</button>
				<span></span>
				{/* <button className="btn-board filter">
					<BsFilter />
					Filter
				</button> */}
				{/* <span></span> */}
				<button
					className="btn-board remove"
					onClick={onRemoveBoard}
					title="Delete board"
				>
					<MdDelete />
				</button>
				<span></span>
				<button className="btn-board menu" onClick={onToggleSideMenu}>
					...
				</button>
			</div>
			<div className="board-main-content">
				<GroupList />
			</div>
			{isSideMenuOpen && (
				<BoardSideMenu
					onToggleSideMenu={onToggleSideMenu}
					changeBackground={changeBackground}
				/>
			)}
			<Outlet />
		</section>
	)
}
