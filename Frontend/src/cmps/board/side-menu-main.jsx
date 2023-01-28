import { useSelector } from 'react-redux'
// import { ActivityLog } from './activity-log'

export function SideMenuMain({ onChangeTitle, onRemoveBoard }) {
	const board = useSelector((state) => state.boardModule.board)

	return (
		<section className="side-menu-main">
			<button onClick={() => onChangeTitle('Change background')}>
				Change background
			</button>
			{/* <button onClick={onRemoveBoard}>Delete board</button> */}
			<hr className="side-menu-separator" />
			{/* <ActivityLog /> */}
		</section>
	)
}
