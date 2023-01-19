import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { AiOutlinePlus } from 'react-icons/ai'
import { boardService } from '../services/board.service'
import { saveGroup } from '../store/board.actions'
import { TaskList } from './task-list'
import { utilService } from '../services/util.service'

export function GroupList({ onRemoveGroup }) {
	const board = useSelector((storeState) => storeState.boardModule.board)
	const [isAddNewGroupOpen, setIsAddNewGroupOpen] = useState(false)
	const [groupToEdit, setGroupToEdit] = useState(boardService.getEmptyGroup())
	const groups = board.groups
	const timeoutId = useRef(null)
	// const elInputRef = useRef(null)
	// useEffect(() => {
	// 	elInputRef.current.focus()
	// }, [])

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

	//  edit existing group
	function handleEditGroup({ target }) {
		let currGroup = getGroupToEdit(target.id)
		currGroup.title = target.value
		saveGroup(currGroup, board._id)
	}

	function getGroupToEdit(groupId) {
		const group = groups.find((grp) => grp.id === groupId)
		return group
	}

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
								remove
							</button>
						</div>
						<TaskList group={group} tasks={group.tasks} />
						<div className="group-bottom">
							<button className="btn-group add-task">
								<AiOutlinePlus className="icon-plus" /> Add a card
							</button>
							<button className="btn-group template">template</button>
						</div>
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
								X
							</a>
						</div>
					</form>
				</div>
			</ul>
		</section>
	)
}
