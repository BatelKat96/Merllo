import { boardImg } from '../img/borads-bg-imgs/b101.jpg'
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

	return (
		<section
			className="board-preview"
			style={{
				backgroundImage: `url(../img/borads-bg-imgs/${board._id}.jpg)`,
			}}
		>
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
