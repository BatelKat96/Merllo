import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { boardService } from '../services/board.service'
import { loadBoard, removeTask, saveTask } from '../store/board.actions'

import { DynamicModal } from '../cmps/dynamic-modal'
import { TaskTitle } from '../cmps/task-details/task-title'
import { TaskDescription } from '../cmps/task-details/task-description'
import { TaskSideBar } from '../cmps/task-details/task-side-bar'
import { TaskChecklistPreview } from '../cmps/task-details/task-checklist/task-checklist-preview'
import { TaskDueDate } from '../cmps/task-details/task-due-date'
import { TaskAttachmentPreview } from '../cmps/task-details/task-attachmente-preview'
import { TaskActivity } from '../cmps/task-details/task-activity/task-activity'
import { TaskDynamicLabel } from '../cmps/task-details/task-dynamic-label'
import { TaskDynamicMember } from '../cmps/task-details/task-dynamic-member'

import Loader from '../assets/img/loader.svg'
import { IoClose } from 'react-icons/io5'
import {
	BsArchive,
	BsPerson,
	BsCheck2Square,
	BsSquareHalf,
	BsArrowCounterclockwise,
} from 'react-icons/bs'

export function TaskDetails() {
	const { boardId, groupId, taskId } = useParams()
	const board = useSelector((storeState) => storeState.boardModule.board)
	const [task, setTask] = useState('')
	const [modalType, setModalType] = useState()
	const {
		labelIds,
		checklists,
		memberIds,
		dueDate,
		isDone,
		attachments,
	} = task

	const memberBtn = useRef()
	const labelBtn = useRef()
	const checklistBtn = useRef()
	const datesBtn = useRef()
	const attachmentBtn = useRef()
	const coverBtn = useRef()
	const moveCardBtn = useRef()


	function getRefData(type) {
		switch (type) {
			case 'members':
				return memberBtn

			case 'labels':
				return labelBtn

			case 'checklist':
				return checklistBtn

			case 'dates':
				return datesBtn

			case 'attachment':
				return attachmentBtn

			case 'cover':
				return coverBtn

			case 'move card':
				return moveCardBtn
		}
	}

	let coverClose = task?.style?.background || task?.style?.backgroundColor ? 'close-hover' : ''

	const navigate = useNavigate()

	useEffect(() => {
		if (!board) loadBoard(boardId)
		loadTask(taskId, groupId, boardId)
	}, [])

	function getGroup(groupId) {
		let groups = board.groups
		let currGroup = groups.find((grp) => grp.id === groupId)
		return currGroup
	}

	async function loadTask(taskId, groupId, boardId) {
		try {
			const task = await boardService.getTaskById(taskId, groupId, boardId)
			setTask(task)
		} catch (err) {
			console.log('Failed to load task', err)
			throw err
		}
	}

	function handleChange({ target }) {
		console.log(':')

		let { value, type, name: field } = target
		value = type === 'number' ? +value : value
		setTask((prevTask) => ({ ...prevTask, [field]: value }))
	}

	async function onRemoveTask() {
		try {
			console.log('remove:')
			const removedTask = await removeTask(taskId, groupId, boardId)
			console.log('removedTask:', removedTask)
			navigate(`/board/${boardId}`)
		} catch (err) {
			console.log('Cannot remove task ', err)
		}
	}

	async function onCopyTask() {
		let copyTask = { ...task }
		copyTask.id = null
		try {
			await saveTask(copyTask, groupId, boardId)
		} catch (err) {
			console.log('Cannot copy task', err)
		}
	}

	/// not good
	function onSaveEdit(ev) {
		ev.preventDefault()
		saveTask(task, groupId, boardId)
	}

	function onSaveTask(ev, updateTask) {
		ev.preventDefault()
		setTask(updateTask)
		saveTask(updateTask, groupId, boardId)
	}

	function onCloseTaskDetails(ev) {
		ev.preventDefault()
		navigate(`/board/${boardId}`)
	}

	function onStopPropagation(ev) {
		ev.stopPropagation()
	}

	function onOpenModal(type) {
		setModalType(type)
	}

	return (
		<>
			<section className="task-details">
				<div onClick={(ev) => onCloseTaskDetails(ev)} className="black-screen">
					<div
						className="task-details-section"
						onClick={(ev) => {
							onStopPropagation(ev)
						}}
					>
						{(!task || !board) && (
							<div className="loader-wrapper">
								<img className="loader" src={Loader} alt="loader" />
							</div>
						)}

						{task && board && (
							<>
								<span
									onClick={(ev) => onCloseTaskDetails(ev)}
									className={`clean-btn btn-task-exit ${coverClose}`}
								>
									<IoClose className="icon-task exit-icon" />
								</span>

								{task.style?.backgroundColor && (
									<section
										className="task-cover"
										style={{ backgroundColor: task.style.backgroundColor }}
									>
										<button
											className="clean-btn  btn-task-cover"
											style={{ top: 60 }}
											ref={coverBtn}
											onClick={() => onOpenModal('cover')}
										>
											<span className="btn-side-bar-icon btn-side-bar-icon-label">
												<BsSquareHalf />
											</span>
											Cover
										</button>
									</section>
								)}

								{task.style?.background && (
									<section
										className="task-cover img"
										style={{ background: task.style.background }}
									>
										<button
											className="clean-btn btn-task-cover"
											style={{ top: 104 }}
											ref={coverBtn}
											onClick={() => onOpenModal('cover')}
										>
											<span>
												<BsSquareHalf />
											</span>
											Cover
										</button>
									</section>
								)}

								<div className="task-details-main-section">
									<TaskTitle
										handleChange={handleChange}
										onSaveEdit={onSaveEdit}
										task={task}
										group={getGroup(groupId)}
										onOpenModal={onOpenModal}
										moveCardBtn={moveCardBtn}
									/>

									<div className="task-details-container">
										<div className="task-details-edit-section">
											<div className="task-details-edit-item">
												{memberIds && memberIds.length > 0 && (
													<TaskDynamicMember
														ids={memberIds}
														board={board}
														type={'members'}
														task={task}
														onSaveTask={onSaveTask}
														onOpenModal={onOpenModal}
														memberBtn={memberBtn}
													/>
												)}
												{labelIds && labelIds.length > 0 && (
													<TaskDynamicLabel
														ids={labelIds}
														board={board}
														type={'labels'}
														task={task}
														onSaveTask={onSaveTask}
														onOpenModal={onOpenModal}
														labelBtn={labelBtn}
													/>
												)}
												{dueDate && (
													<TaskDueDate
														dueDate={dueDate}
														isDone={isDone}
														task={task}
														onSaveTask={onSaveTask}
														datesBtn={datesBtn}
														onOpenModal={onOpenModal}
													/>
												)}
											</div>
											<TaskDescription
												handleChange={handleChange}
												onSaveEdit={onSaveEdit}
												task={task}
												onSaveTask={onSaveTask}
											/>
											{checklists && checklists.length > 0 && (
												<TaskChecklistPreview
													task={task}
													onSaveTask={onSaveTask}
													setTask={setTask}
												/>
											)}
											{attachments && attachments.length > 0 && (
												<TaskAttachmentPreview
													handleChange={handleChange}
													task={task}
													onSaveTask={onSaveTask}
												/>
											)}

											<TaskActivity task={task} onSaveTask={onSaveTask} />
										</div>
										<TaskSideBar
											task={task}
											onRemoveTask={onRemoveTask}
											onCopyTask={onCopyTask}
											onSaveTask={onSaveTask}
										/>
									</div>
								</div>
							</>
						)}
					</div>
				</div>

				{modalType &&
					(
					<DynamicModal
							cmpType={modalType}
							refDataBtn={getRefData(modalType)}
							task={task}
							groupId={groupId}
							boardId={boardId}
							onOpenModal={onOpenModal}
							onSaveTask={onSaveTask}
						/>
					)}
			</section>
		</>
	)
}
