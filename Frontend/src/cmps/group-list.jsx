import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { boardService } from '../services/board.service'

import { TaskList } from './task-list'

export function GroupList({ onRemoveGroup }) {
	const board = useSelector((storeState) => storeState.boardModule.board)
	const [isAddNewListOpen, setIsAddNewListOpen] = useState(false)
	const groups = board.groups

	let addNewListOpenClosed = isAddNewListOpen ? 'open' : 'closed'

	function onToggleAddCancelList() {
		setIsAddNewListOpen(!isAddNewListOpen)
	}

	function onAddTask() {
		console.log('add new task to group')
	}

	if (!groups) return <h1>loadings....</h1>

	return (
		<section className="group-list-container">
			<ul className="group-list clean-list">
				{groups.map((group) => (
					<li className="group-wrapper" key={group.id}>
						<div className="group-top">
							<h2 className="group-title">{group.title}</h2>
							<button
								className="group-btn"
								onClick={() => {
									onRemoveGroup(group.id)
								}}
							>
								remove
							</button>
						</div>
						<TaskList tasks={group.tasks} />
						<div className="group-bottom">
							<button className="group-btn add-card">+ Add a card</button>
							<button className="group-btn">template</button>
						</div>
					</li>
				))}
				{/* <div className={'add-new-group ' + addNewListOpenClosed}> */}
				<div className={`add-new-group ${addNewListOpenClosed}`}>
					<form>
						<input
							type="text"
							name="title"
							placeholder="Enter list title..."
							maxLength="512"
						/>

						<div
							className="placeholder"
							onClick={() => {
								onToggleAddCancelList()
							}}
						>
							+ Add another list
						</div>
					</form>
					<div className="add-group-controls">
						<button className="add-list-btn">Add list</button>
						<button
							className="cancel-list-btn"
							onClick={() => {
								onToggleAddCancelList()
							}}
						>
							X
						</button>
					</div>
				</div>
			</ul>
		</section>
	)
}
