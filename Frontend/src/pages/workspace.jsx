import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { addBoard, loadBoards } from '../store/board.actions'
import { boardService } from '../services/board.service'

import { AiOutlineClockCircle } from 'react-icons/ai'
import { HiOutlineStar } from 'react-icons/hi2'
import { IoClose } from 'react-icons/io5'
import { BoardCreate } from '../cmps/board-create'

export function Workspace() {
	const boards = useSelector((storeState) => storeState.boardModule.boards)
	const [isBoardComposerOpen, setIsBoardComposerOpen] = useState(false)
	const [boardToEdit, setBoardToEdit] = useState(boardService.getEmptyBoard())

	useEffect(() => {
		loadBoards()
	}, [])

	function openBoardComposer() {
		setIsBoardComposerOpen(true)
	}

	function closeBoardComposer() {
		setIsBoardComposerOpen(false)
		setBoardToEdit(boardService.getEmptyBoard())
	}

	if (!boards) return <h1>Loading....</h1>

	return (
		<section className="workspace-section">
			<div className="starred-boards">
				<div className="boards-section-header">
					<div className="boards-section-header-icon">
						<HiOutlineStar />
					</div>
					<div className="boards-section-header-name">
						<h3>Starred boards</h3>
					</div>
				</div>

				<ul className="board-list clean-list">
					{boards.map((board) => (
						<Link to={`/board/${board._id}`}>
							<li className={`board-preview board-b101`} key={board._id}>
								{board.title}
							</li>
						</Link>
					))}
				</ul>
			</div>

			<div className="recently-viewed-boards">
				<div className="boards-section-header">
					<div className="boards-section-header-icon">
						<AiOutlineClockCircle />
					</div>
					<div className="boards-section-header-name">
						<h3>Recently viewed</h3>
					</div>
				</div>

				<ul className="board-list clean-list">
					<li
						className="board-preview create-new-board"
						onClick={openBoardComposer}
					>
						<span>Create new board</span>
					</li>
					{boards.map((board) => (
						<Link to={`/board/${board._id}`}>
							<li className={`board-preview board-b101`} key={board._id}>
								{board.title}
							</li>
						</Link>
					))}
				</ul>

				{isBoardComposerOpen && (
					<BoardCreate closeBoardComposer={closeBoardComposer} />
				)}
			</div>
		</section>
	)
}
