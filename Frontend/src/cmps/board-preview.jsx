import { boardImg } from '../img/borads-bg-imgs/b101.jpg'
import { HiOutlineStar } from 'react-icons/hi2'

export function BoardPreview({ board }) {
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
						<span className="preview-board-starred">
							<HiOutlineStar />
						</span>
					)}
				</div>
			</span>
		</section>
	)
}
