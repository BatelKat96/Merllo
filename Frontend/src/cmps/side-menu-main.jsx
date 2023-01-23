import { useSelector } from 'react-redux'

export function SideMenuMain({ onChangeTitle }) {
	const board = useSelector((state) => state.boardModule.board)

	return (
		<section className="side-menu-main">
			<section className="board-menu-content-frame">
				<a onClick={() => onChangeTitle('Change background')}>
					Change background
				</a>
			</section>
		</section>
	)
}
