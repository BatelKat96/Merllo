import { useState } from 'react'
import { addBoard } from '../store/board.actions'
import { boardService } from '../services/board.service'

import { IoClose } from 'react-icons/io5'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function BoardCreate({ closeBoardComposer }) {
	const board = useSelector((storeState) => storeState.boardModule.board)
	const boards = useSelector((storeState) => storeState.boardModule.boards)
	const [boardToEdit, setBoardToEdit] = useState(boardService.getEmptyBoard())
	const navigate = useNavigate()

	function handleNewBoard({ target }) {
		let { value, name: field } = target
		setBoardToEdit((prevBoard) => ({ ...prevBoard, [field]: value }))
	}

	async function onSaveBoard(ev) {
		ev.preventDefault()
		if (!boardToEdit.title) return
		try {
			const newBoard = await addBoard(boardToEdit)
			closeBoardComposer()
			setBoardToEdit(boardService.getEmptyBoard())
			navigate(`/board/${newBoard._id}`)
		} catch (err) {
			console.log('Failed to save new board', err)
		}
	}

	return (
		<section className="create-board-composer">
			<div className="create-board-composer-header">
				<h2>Create board</h2>
				<button
					className="btn-board-composer close"
					onClick={closeBoardComposer}
				>
					<IoClose className="icon-close" />
				</button>
			</div>
			<form>
				<p>Board title</p>
				<input
					type="text"
					name="title"
					maxLength="512"
					value={boardToEdit.title}
					onChange={handleNewBoard}
				/>
				<button className="btn-board-composer create" onClick={onSaveBoard}>
					Create
				</button>
			</form>
		</section>
	)
}
