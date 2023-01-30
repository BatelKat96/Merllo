import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { loadBoards, updateBoard } from '../store/board.actions'
import { boardService } from '../services/board.service'

import { BoardCreate } from '../cmps/board/board-create'
import { BoardPreview } from '../cmps/board/board-preview'

import { AiOutlineClockCircle } from 'react-icons/ai'
import { HiOutlineStar } from 'react-icons/hi2'
import { ReactComponent as UserSvg } from '../assets/img/icons-header/user.svg'
import Loader from '../assets/img/loader.svg'

export function Workspace() {
	const boards = useSelector((storeState) => storeState.boardModule.boards)
	const board = useSelector((storeState) => storeState.boardModule.board)
	const [isBoardComposerOpen, setIsBoardComposerOpen] = useState(false)
	const [boardToEdit, setBoardToEdit] = useState(boardService.getEmptyBoard())

	const starredBoards = getStarredBoards()

	const createBtn = useRef()
	const refDataBtn = createBtn

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

	function getStarredBoards() {
		return boards.filter((board) => board.isStarred)
	}

	async function onToggleStar(event, board) {
		event.stopPropagation()
		event.preventDefault()
		board.isStarred = !board.isStarred
		try {
			await updateBoard(board)
		} catch (err) {
			console.log('Cannot update board', err)
		}
	}

	if (!boards)
		return (
			<div className="loader-wrapper">
				<img className="loader" src={Loader} alt="loader" />
			</div>
		)

	return (
		<section className="workspace-section">
			{starredBoards.length !== 0 && (
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
						{starredBoards.map((strdBoard) => {
							return (
								<li key={`starred-${strdBoard._id}`}>
									<a href={`/board/${strdBoard._id}`}>
										<BoardPreview
											board={strdBoard}
											onToggleStar={onToggleStar}
										/>
									</a>
								</li>
							)
						})}
					</ul>
				</div>
			)}

			<div className="my-boards">
				<div className="boards-section-header">
					<div className="boards-section-header-icon">
						<UserSvg />
					</div>
					<div className="boards-section-header-name">
						<h3>Your boards</h3>
					</div>
				</div>

				<ul className="board-list clean-list">
					{boards.map((board) => (
						<li key={`your-${board._id}`}>
							<a href={`/board/${board._id}`}>
								<BoardPreview board={board} onToggleStar={onToggleStar} />
							</a>
						</li>
					))}
					<li
						className="board-preview create-new-board"
						onClick={openBoardComposer}
						key="001"
						ref={createBtn}
					>
						<span>Create new board</span>
					</li>
				</ul>

				{isBoardComposerOpen && (
					<BoardCreate
						closeBoardComposer={closeBoardComposer}
						refDataBtn={refDataBtn}
					/>
				)}
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

				<ul className="board-list clean-list recently-viewed">
					{boards.map((board) => (
						<li key={`recent-${board._id}`}>
							<a href={`/board/${board._id}`}>
								<BoardPreview board={board} onToggleStar={onToggleStar} />
							</a>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
