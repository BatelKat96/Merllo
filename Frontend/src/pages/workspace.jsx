import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadBoards, updateBoard } from '../store/board.actions'
import { boardService } from '../services/board.service'
import { BoardCreate } from '../cmps/board-create'
import { BoardPreview } from '../cmps/board-preview'

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
			console.log('success')
		} catch (err) {
			console.log('Cannot update board', err)
		}
	}

	// function getBoardStyle(board) {
	// 	if (!board) return
	// 	if (board?.style.bgImg)
	// 		return {
	// 			background: `url ("${board.style.bgImg}")`,
	// 		}
	// 	// else if (board?.style.backgroundColor)
	// 	// 	return { backgroundColor: `${board.style.bgColor}` }
	// 	return { backgroundColor: `blue` }
	// }

	if (!boards) return <img className="loader" src={Loader} alt="loader" />

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
								// <a href={`/board/${strdBoard._id}`}>
								// 	<li
								// 		className={`board-preview`}
								// 		key={`starred-${strdBoard._id}`}
								// 		style={boardStyle}
								// 	>
								// 		{strdBoard.title}
								// 	</li>
								// </a>

								// <Link to={`/board/${strdBoard._id}`}>
								// 	<li
								// 		className={`board-preview`}
								// 		key={`starred-${strdBoard._id}`}
								// 		style={boardStyle}
								// 	>
								// 		{strdBoard.title}
								// 	</li>
								// </Link>
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
					>
						<span>Create new board</span>
					</li>
				</ul>

				{isBoardComposerOpen && (
					<BoardCreate closeBoardComposer={closeBoardComposer} />
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

				<ul className="board-list clean-list">
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
