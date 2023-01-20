import { Link } from 'react-router-dom'
import { AiOutlineStar, AiOutlineClockCircle } from 'react-icons/ai'
import { HiOutlineStar } from 'react-icons/hi2'

export function Workspace() {
	console.log('wow:')

	function createBoard() {
		console.log('create new board')
	}

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
					<Link to="/board/b101">
						<li className="board-preview board-b101">Demo</li>
					</Link>
					<Link to="/board/b102">
						<li className="board-preview board-b102"></li>
					</Link>
					<Link to="/board/b103">
						<li className="board-preview board-b102"></li>
					</Link>
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
						onClick={() => createBoard()}
					>
						<span>Create new board</span>
					</li>
					<Link to="/board/b101">
						<li className="board-preview board-b101">Demo</li>
					</Link>
					<Link to="/board/b102">
						<li className="board-preview board-b102"></li>
					</Link>
					<Link to="/board/b103">
						<li className="board-preview board-b103"></li>
					</Link>
				</ul>
			</div>
		</section>
	)
}
