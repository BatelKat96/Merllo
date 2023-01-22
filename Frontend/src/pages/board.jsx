import { useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadBoard, removeBoard, updateBoard } from '../store/board.actions'

import { HiOutlineStar } from 'react-icons/hi2'
import { BsFilter } from 'react-icons/bs'
import { MdDeleteOutline, MdDelete } from 'react-icons/md'

import { GroupList } from '../cmps/group-list'

export function Board() {
	const { boardId } = useParams()
	const board = useSelector((storeState) => storeState.boardModule.board)

	const navigate = useNavigate()

	useEffect(() => {
		loadBoard(boardId)
	}, [])

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

	if (!board) return <h1>Loading....</h1>

	return (
		<section
			className="board"
			style={{
				backgroundImage: `url(../img/borads-bg-imgs/${board._id}.jpg)`,
			}}
		>
			<div className="board-top-menu">
				<h1>{board.title}</h1>
				{/* <button className="btn-board star"> */}
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
				{/* <button className="btn-board menu">...</button> */}
			</div>
			<div className="board-main-content">
				<GroupList />
			</div>
			<Outlet />
		</section>
	)
}
