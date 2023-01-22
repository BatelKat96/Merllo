import { boardImg } from '../img/borads-bg-imgs/b101.jpg'

export function BoardPreview({ board }) {
	return (
		<section
			className="board-preview"
			style={{
				backgroundImage: `url(../img/borads-bg-imgs/${board._id}.jpg)`,
			}}
		>
			<span className="preview-fade">
				<div className="preview-details">{board.title}</div>
			</span>
		</section>
	)
}
