import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { boardService } from '../services/board.service'
import { saveGroup } from '../store/board.actions'

import { TaskList } from './task-list'

export function GroupList({ onRemoveGroup }) {
	const board = useSelector((storeState) => storeState.boardModule.board)
	const [isAddNewListOpen, setIsAddNewListOpen] = useState(false)
	const [groupToEdit, setGroupToEdit] = useState(boardService.getEmptyGroup())
	const groups = board.groups

	let addNewListOpenClosed = isAddNewListOpen ? 'open' : 'closed'
	function onToggleAddCancelList() {
		setIsAddNewListOpen(!isAddNewListOpen)
	}

	function handleListChange({ target }) {
		let { value, name: field } = target
		setGroupToEdit((prevGroup) => ({ ...prevGroup, [field]: value }))
	}

	async function onSubmit(ev) {
		ev.preventDefault()
		try {
			await saveGroup(groupToEdit, board._id)
			onToggleAddCancelList()
			setGroupToEdit(boardService.getEmptyGroup())
		} catch (err) {
			console.log('Failed to save group', err)
		}
	}

	function onAddTask(ev) {
		ev.preventDefault()
		console.log('ev', ev)
		console.log('add new task to group')
	}

	if (!groups) return <h1>Loading....</h1>

	return (
		<section className="group-list-container">
			<ul className="group-list clean-list">
				{groups.map((group) => (
					<li className="group-wrapper" key={group.id}>
						<div className="group-top">
							<h2 className="group-title">{group.title}</h2>
							<button
								className="btn-group"
								onClick={() => {
									onRemoveGroup(group.id)
								}}
							>
								remove
							</button>
						</div>
						<TaskList group={group} tasks={group.tasks} />
						<div className="group-bottom">
							<button className="btn-group add-card">+ Add a card</button>
							<button className="btn-group">template</button>
						</div>
					</li>
				))}

				<div className={`add-new-group ${addNewListOpenClosed}`}>
					<form onSubmit={onSubmit}>
						<input
							type="text"
							name="title"
							id="title"
							placeholder="Enter list title..."
							maxLength="512"
							value={groupToEdit.title}
							onChange={handleListChange}
						/>
						<div
							className="placeholder"
							onClick={() => {
								onToggleAddCancelList()
							}}
						>
							+ Add another list
						</div>
						<div className="add-group-controls">
							<button className="btn-add-list" type="submit">
								Add list
							</button>
							<a
								href="#"
								className="btn-cancel-list"
								onClick={() => {
									onToggleAddCancelList()
								}}
							>
								X
							</a>
						</div>
					</form>
				</div>
			</ul>
		</section>
	)
}
