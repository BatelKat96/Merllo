import { IoClose } from 'react-icons/io5'

export function BoardSideMenu({ onToggleSideMenu }) {
	return (
		<section className="board-side-menu">
			<div className="board-side-menu-header">
				<h3 className="board-side-menu-header-title">Menu</h3>
				<a className="board-side-menu-header-cancel" onClick={onToggleSideMenu}>
					<IoClose className="icon-close" />
				</a>
			</div>
			<div className="board-side-menu-content">
				<ul className="clean-list">
					<li>
						<a>Change background</a>
					</li>
				</ul>
			</div>
		</section>
	)
}
