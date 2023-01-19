import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { boardService } from '../services/board.service'
import { saveGroup } from '../store/board.actions'

import { TaskList } from './task-list'

export function GroupList({ onRemoveGroup }) {
	const board = useSelector((storeState) => storeState.boardModule.board)
	const [isAddNewGroupOpen, setIsAddNewGroupOpen] = useState(false)
	const [groupToEdit, setGroupToEdit] = useState(boardService.getEmptyGroup())
	const groups = board.groups

	let addNewGroupOpenClosed = isAddNewGroupOpen ? 'open' : 'closed'
	function onToggleAddCancelGroup() {
		setIsAddNewGroupOpen(!isAddNewGroupOpen)
	}
	function closeAddNewGroup() {
		setIsAddNewGroupOpen(false)
	}

	function handleGroupChange({ target }) {
		// check if it's an existing group or a new one
		if (target.id) {
			setGroupToEdit(getGroupToEdit(target.id))
		} else {
			let { value, name: field } = target
			setGroupToEdit((prevGroup) => ({ ...prevGroup, [field]: value }))
		}
	}

	function getGroupToEdit(groupId) {
		const group = groups.find((grp) => grp.id === groupId)
		return group
	}

	async function onSaveGroup(ev) {
		ev.preventDefault()
		try {
			await saveGroup(groupToEdit, board._id)
			closeAddNewGroup()
			setGroupToEdit(boardService.getEmptyGroup())
		} catch (err) {
			console.log('Failed to save group', err)
		}
	}

	if (!groups) return <h1>Loading....</h1>
	return (
		<section className="group-list-container">
			<ul className="group-list clean-list">
				{groups.map((group) => (
					<li className="group-wrapper" key={group.id}>
						<div className="group-top open">
							<form onBlurCapture={onSaveGroup}>
								<textarea
									name="title"
									className="edit-group-title"
									id={group.id}
									maxLength="512"
									defaultValue={group.title}
									onChange={handleGroupChange}
								></textarea>
							</form>
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

				<div className={`add-new-group ${addNewGroupOpenClosed}`}>
					<form onSubmit={onSaveGroup} onBlurCapture={closeAddNewGroup}>
						<input
							type="text"
							name="title"
							placeholder="Enter list title..."
							maxLength="512"
							value={groupToEdit.title}
							onChange={handleGroupChange}
						/>
						<div
							className="placeholder"
							onClick={() => {
								onToggleAddCancelGroup()
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
									onToggleAddCancelGroup()
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
