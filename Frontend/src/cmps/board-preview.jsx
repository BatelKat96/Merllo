import { HiOutlineStar } from 'react-icons/hi2'
import { updateBoard } from '../store/board.actions'

export function BoardPreview({ board, onToggleStar }) {
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
					{board.isStarred ? (
						<span
							className="preview-board-starred"
							onClick={(event) => onToggleStar(event, board)}
						>
							<HiOutlineStar />
						</span>
					) : (
						<span
							className="preview-board-not-starred"
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
