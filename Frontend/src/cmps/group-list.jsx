import { useState } from 'react'
import { useSelector } from 'react-redux'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoClose } from 'react-icons/io5'
import { HiDotsHorizontal } from 'react-icons/hi'

import { boardService } from '../services/board.service'
import { removeGroup, saveGroup } from '../store/board.actions'
import { TaskList } from './task-list'
import { GroupDropdown } from './group-dropdown'

export function GroupList() {
	const board = useSelector((storeState) => storeState.boardModule.board)
	const [isAddNewGroupOpen, setIsAddNewGroupOpen] = useState(false)
	const [isDropdownOpen, setIsDropdownOpen] = useState({ groupId: '' })
	const [groupToEdit, setGroupToEdit] = useState(boardService.getEmptyGroup())
	const groups = board.groups

	//  create new group
	function openAddNewGroup() {
		setIsAddNewGroupOpen(true)
	}
	function closeAddNewGroup() {
		setIsAddNewGroupOpen(false)
		setGroupToEdit(boardService.getEmptyGroup())
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
	async function handleEditGroup({ target }) {
		let currGroup = getGroupToEdit(target.id)
		currGroup.title = target.value
		try {
			await saveGroup(currGroup, board._id)
		} catch (err) {
			console.log('Failed to update group', err)
		}
	}

	function getGroupToEdit(groupId) {
		const group = groups.find((grp) => grp.id === groupId)
		return group
	}

	// remove group
	async function onRemoveGroup(groupId) {
		try {
			await removeGroup(groupId, board._id)
		} catch (err) {
			console.log('Failed to remove group', err)
		}
	}

	// duplicate group
	async function onCopyGroup(group) {
		let duplicatedGroup = { ...group }
		duplicatedGroup.id = null
		try {
			await saveGroup(duplicatedGroup, board._id)
		} catch (err) {
			console.log('Failed to duplicate group', err)
		} finally {
			toggleDropdown()
		}
	}

	//  dropdown control
	function toggleDropdown(event, groupId) {
		if (isDropdownOpen.groupId === groupId) {
			setIsDropdownOpen({ groupId: '' })
		} else {
			setIsDropdownOpen({ groupId })
		}
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
									spellCheck="false"
									maxLength="512"
									defaultValue={group.title}
									onChange={handleEditGroup}
								></textarea>
							</form>
							<button
								className="btn-group more"
								onClick={(event) => toggleDropdown(event, group.id)}
							>
								<HiDotsHorizontal className="icon-more" />
							</button>
							{isDropdownOpen.groupId === group.id && (
								<GroupDropdown
									toggleDropdown={toggleDropdown}
									onRemoveGroup={onRemoveGroup}
									onCopyGroup={onCopyGroup}
									group={group}
								/>
							)}
						</div>
						<TaskList group={group} tasks={group.tasks} />
					</li>
				))}

				<div className={`add-new-group`}>
					{!isAddNewGroupOpen && (
						<div
							className="placeholder"
							onClick={() => {
								openAddNewGroup()
							}}
						>
							<AiOutlinePlus className="icon-plus" /> Add another list
						</div>
					)}
					{isAddNewGroupOpen && (
						<form className="add-group-form">
							<input
								type="text"
								name="title"
								placeholder="Enter list title..."
								autoFocus
								spellCheck="false"
								maxLength="512"
								value={groupToEdit.title}
								onChange={handleNewGroup}
							/>
							<div className="add-group-controls">
								<button className="add-group" onClick={onSaveNewGroup}>
									Add list
								</button>
								<a
									className="cancel"
									onClick={() => {
										closeAddNewGroup()
									}}
								>
									<IoClose className="icon-close" />
								</a>
							</div>
						</form>
					)}
				</div>
			</ul>
		</section>
	)
}
