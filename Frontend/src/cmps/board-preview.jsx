import { HiOutlineStar } from 'react-icons/hi2'
import { updateBoard } from '../store/board.actions'

export function BoardPreview({ board, onToggleStar }) {
	// async function onToggleStar(event) {
	// 	event.stopPropagation()
	// 	event.preventDefault()
	// 	board.isStarred = !board.isStarred
	// 	try {
	// 		await updateBoard(board)
	// 		console.log('success')
	// 	} catch (err) {
	// 		console.log('Cannot update board', err)
	// 	}
	// }

	function getBoardStyle() {
		if (!board) return
		if (board?.style.background) {
			return {
				background: `url('${board.style.thumbnail}') center center / cover`,
			}
		} else if (board?.style.backgroundColor) {
			return { backgroundColor: `${board.style.backgroundColor}` }
		}
		return { backgroundColor: `#0067a3` }
	}
	const boardStyle = getBoardStyle()

	return (
		<section className="board-preview" style={boardStyle}>
			<span className="preview-fade">
				<div className="preview-details">
					<span className="preview-board-title">{board.title}</span>
					{board.isStarred && (
						// <button className="preview-board-starred">
						// 	<HiOutlineStar />
						// </button>
						<span
							className="preview-board-starred"
							onClick={(event) => onToggleStar(event, board)}
						>
							<HiOutlineStar />
						</span>
					)}
				</div>
			</span>
		</section>
	)
}
