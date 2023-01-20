import { useState } from 'react'
import { useSelector } from 'react-redux'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoClose } from 'react-icons/io5'
import { MdOutlineContentCopy, MdDeleteOutline } from 'react-icons/md'

import { boardService } from '../services/board.service'
import { removeGroup, saveGroup } from '../store/board.actions'
import { TaskList } from './task-list'

export function GroupList() {
	const board = useSelector((storeState) => storeState.boardModule.board)
	const [isAddNewGroupOpen, setIsAddNewGroupOpen] = useState(false)
	const [groupToEdit, setGroupToEdit] = useState(boardService.getEmptyGroup())
	const groups = board.groups

	//  create new group
	let addNewGroupOpenClosed = isAddNewGroupOpen ? 'open' : 'closed'
	function closeAddNewGroup() {
		setIsAddNewGroupOpen(false)
		setGroupToEdit(boardService.getEmptyGroup())
	}
	function openAddNewGroup() {
		setIsAddNewGroupOpen(true)
	}

	function handleNewGroup({ target }) {
		let { value, name: field } = target
		setGroupToEdit((prevGroup) => ({ ...prevGroup, [field]: value }))
	}

	async function onSaveNewGroup(ev) {
		ev.preventDefault()
		if (!groupToEdit.title) return
		try {
			await saveGroup(groupToEdit, board._id)
			closeAddNewGroup()
			setGroupToEdit(boardService.getEmptyGroup())
		} catch (err) {
			console.log('Failed to save new group', err)
		}
	}

	//  update existing group
	function handleEditGroup({ target }) {
		let currGroup = getGroupToEdit(target.id)
		currGroup.title = target.value
		saveGroup(currGroup, board._id)
	}

	function getGroupToEdit(groupId) {
		const group = groups.find((grp) => grp.id === groupId)
		return group
	}

	// remove group
	async function onRemoveGroup(groupId) {
		try {
			await removeGroup(groupId, board._id)
			console.log('Group removed')
		} catch (err) {
			console.log('Cannot remove group', err)
		}
	}

	// duplicate group
	async function onCopyGroup(group) {
		let duplicatedGroup = { ...group }
		duplicatedGroup.id = null
		try {
			await saveGroup(duplicatedGroup, board._id)
			console.log('Group duplicated')
		} catch (err) {
			console.log('Cannot duplicate group', err)
		}
	}

	// create new task
	// let addNewTaskOpenClosed = isAddNewTaskOpen ? 'open' : 'closed'
	// function closeAddNewTask() {
	// 	setIsAddNewTaskOpen(false)
	// 	setGroupToEdit(boardService.getEmptyGroup())
	// }
	// function openAddNewTask() {
	// 	setIsAddNewTaskOpen(true)
	// }

	// function handleNewTask({ target }) {
	// 	let { value, name: field } = target
	// 	setTaskToEdit((prevTask) => ({ ...prevTask, [field]: value }))
	// }

	// async function onAddTask(ev) {
	// 	ev.preventDefault()
	// 	if (!taskToEdit.title) return
	// 	try {
	// 		await saveTask(taskToEdit, ev.target.id, board._id)
	// 		setTaskToEdit(boardService.getEmptyTask())
	// 		closeAddNewTask()
	// 	} catch (err) {
	// 		console.log('Failed to save new task', err)
	// 	}
	// }

	if (!groups) return <h1>Loading....</h1>
	return (
		<section className="group-list-container">
			<ul className="group-list clean-list">
				{groups.map((group) => (
					<li className="group-wrapper" key={group.id}>
						<div className="group-top">
							<form>
								<textarea
									name="title"
									className="edit-group-title"
									id={group.id}
									maxLength="512"
									defaultValue={group.title}
									onChange={handleEditGroup}
								></textarea>
							</form>
							<button
								className="btn-group remove"
								onClick={() => {
									onRemoveGroup(group.id)
								}}
							>
								<MdDeleteOutline className="icon-remove" />
							</button>
							<button
								className="btn-group copy"
								onClick={() => {
									onCopyGroup(group)
								}}
							>
								<MdOutlineContentCopy className="icon-copy" />
							</button>
						</div>
						<TaskList group={group} tasks={group.tasks} />
						{/* <div className="group-bottom"> */}
						{/* <div>
								<button
									className="btn-group add-a-task"
									onClick={() => openAddNewTask()}
								>
									<AiOutlinePlus className="icon-plus" /> Add a card
								</button>
								<button className="btn-group template">template</button>
							</div> */}
						{/* <div className="task-composer">
								<form>
									<textarea
										className="task-preview"
										type="text"
										name="title"
										id={group.id}
										placeholder="Enter a title for this card..."
										maxLength="512"
										value={taskToEdit.title}
										onChange={handleNewTask}
									></textarea>
									<div className="add-task-controls">
										<button
											className="btn-group add-task"
											id={group.id}
											onClick={onAddTask}
										>
											Add Card
										</button>
										<a
											className="btn-group cancel"
											onClick={() => {
												closeAddNewTask()
											}}
										>
											<IoClose className="icon-close" />
										</a>
									</div>
								</form>
							</div> */}
						{/* </div> */}
					</li>
				))}

				<div className={`add-new-group ${addNewGroupOpenClosed}`}>
					<div
						className="placeholder"
						onClick={() => {
							openAddNewGroup()
						}}
					>
						<AiOutlinePlus className="icon-plus" /> Add another list
					</div>
					<form>
						<input
							type="text"
							name="title"
							placeholder="Enter list title..."
							maxLength="512"
							value={groupToEdit.title}
							onChange={handleNewGroup}
						/>
						<div className="add-group-controls">
							<button className="btn-group add-group" onClick={onSaveNewGroup}>
								Add list
							</button>
							<a
								className="btn-group cancel"
								onClick={() => {
									closeAddNewGroup()
								}}
							>
								<IoClose className="icon-close" />
							</a>
						</div>
					</form>
				</div>
			</ul>
		</section>
	)
}
