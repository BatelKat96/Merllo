import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { boardService } from '../../services/board.service'
import { removeGroup, saveGroup, updateBoard } from '../../store/board.actions'

import { TaskList } from '../task-preview/task-list'
import { GroupDropdown } from './group-dropdown'

import Loader from '../../assets/img/loader.svg'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoClose } from 'react-icons/io5'
import { HiDotsHorizontal } from 'react-icons/hi'

export function GroupList() {
	const board = useSelector((storeState) => storeState.boardModule.board)
	const { boardId } = useParams()

	const [isAddNewGroupOpen, setIsAddNewGroupOpen] = useState(false)
	const [isDropdownOpen, setIsDropdownOpen] = useState({ groupId: '' })
	const [groupToEdit, setGroupToEdit] = useState(boardService.getEmptyGroup())
	const [groupsDrag, setGroups] = useState(board)

	let groups = board.groups

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

	//dragNdrop
	async function handleOnDragEnd(result) {
		const { destination, source, draggableId, type } = result
		// console.log('result', result);
		// console.log('source', source);
		// console.log('destination', destination);
		// console.log('type', type);

		if (!destination) return

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) return

		if (type === 'groups') {
			const newGroups = Array.from(groups)
			const [reorderedGroups] = newGroups.splice(source.index, 1)
			newGroups.splice(destination.index, 0, reorderedGroups)

			board.groups = newGroups
			updateBoard(board)
			return
		}

		if (type === 'tasks') {
			const sourceGroup = groups.find(group => group.id === source.droppableId)
			const destinationGroup = groups.find(group => group.id === destination.droppableId)

			if (sourceGroup === destinationGroup) {
				const newTasks = Array.from(sourceGroup.tasks)
				const [task] = newTasks.splice(source.index, 1)
				newTasks.splice(destination.index, 0, task)

				sourceGroup.tasks = newTasks
				updateBoard(board)
				return
			}

			else {
				const newSourceGroup = Array.from(sourceGroup.tasks)
				const newDestinationGroup = Array.from(destinationGroup.tasks)
				const [task] = newSourceGroup.splice(source.index, 1)
				newDestinationGroup.splice(destination.index, 0, task)

				sourceGroup.tasks = newSourceGroup
				destinationGroup.tasks = newDestinationGroup
				updateBoard(board)
				return
			}
		}
	}


	if (!groups) return <div className="loader-wrapper"><img className="loader" src={Loader} alt="loader" /></div>

	const addNewTxt = groups.length === 0 ? 'Add a list' : 'Add another list'

	return (
		<section className="group-list-container">

			<DragDropContext onDragEnd={handleOnDragEnd}>

				<Droppable droppableId="groups"
					direction="horizontal"
					type="groups"
					key="groups">

					{(provided) => ( 

						<ul className="group-list clean-list groups"
							{...provided.droppableProps}
							ref={provided.innerRef}>

							{groups.map((group, index) => (

								<Draggable key={group.id}
									draggableId={group.id}
									index={index}>

									{(provided) => (

										<li className="group-wrapper" key={group.id}
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}>

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
											<TaskList
												group={group}
												handleOnDragEnd={handleOnDragEnd}
											/>

										</li>)}
								</Draggable>
							))}
							{provided.placeholder}
						</ul>
					)}

				</Droppable>
			</DragDropContext>

			<div className={`add-new-group`}>
				{!isAddNewGroupOpen && (
					<div
						className="placeholder"
						onClick={() => {
							openAddNewGroup()
						}}
					>
						<AiOutlinePlus className="icon-plus" />
						<span>{addNewTxt}</span>
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
		</section>
	)
}
