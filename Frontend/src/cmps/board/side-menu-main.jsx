import { useSelector } from 'react-redux'

export function SideMenuMain({ onChangeTitle, onRemoveBoard }) {
	const board = useSelector((state) => state.boardModule.board)

	return (
		<section className="side-menu-main">
			<button onClick={() => onChangeTitle('Change background')}>
				Change background
			</button>
			{/* <hr className="side-menu-separator" /> */}
			<button onClick={onRemoveBoard}>Delete board</button>
		</section>
	)
}
