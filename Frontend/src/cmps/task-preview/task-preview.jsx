import { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { QuickTaskEdit } from './quick-task-edit'

import { utilService } from '../../services/util.service'
import { ReactComponent as EditSvg } from '../../assets/img/icons-task-preview/edit.svg'
import descriptionIcon from '../../assets/img/icons-task-details/description-icon.svg'
import { FaRegComment } from 'react-icons/fa'
import { FiPaperclip } from 'react-icons/fi'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { BsCheck2Square } from 'react-icons/bs'
import { GrTextAlignFull } from 'react-icons/gr'

export function TaskPreview({ group, task, board }) {
	const { boardId } = useParams()
	const navigate = useNavigate()

	const [quickTaskEdit, toggleQuickTaskEdit] = useState(false)

	const quickEditBtn = useRef()

	const currLabels = task.labelIds
	const currMembers = task.memberIds
	const currCover = task.style
	const currComments = task.comments
	const currAttach = task?.attachments
	const currDueDate = task.dueDate
	const currCheck = task.checklists


	var fullMembers = currMembers
		? utilService.findDataById(currMembers, board, 'members')
		: ''

	var fullLabels = currLabels
		? utilService.findDataById(currLabels, board, 'labels')
		: ''

	function onQuickTaskEdit(ev) {
		ev.stopPropagation()
		// ev.preventDefault()
		toggleQuickTaskEdit(!quickTaskEdit) 
	}

	function onTask() {
		navigate(`/board/${boardId}/${group.id}/${task.id}`)
	}

	function onLabel(ev) {
		ev.stopPropagation()
		// ev.preventDefault()
	}

	return (
		<>
			<section className="task-preview" onClick={onTask}>

				{currCover?.backgroundColor && (
					<div
						className="task-preview-cover"
						style={currCover}>
					</div>
				)}

				{currCover?.background && (
					<div
						className="task-preview-cover img"
						style={currCover}>
					</div>
				)}

				<button className="edit-btn"
					onClick={onQuickTaskEdit}
					ref={quickEditBtn}>
					<EditSvg />

					{quickTaskEdit && (
						<QuickTaskEdit
							taskId={task.id}
							groupId={group.id}
							boardId={boardId}
							task={task}
							onEdit={onQuickTaskEdit}
							toggleQuickTaskEdit={toggleQuickTaskEdit}
							quickTaskEdit={quickTaskEdit}
							refDataBtn={quickEditBtn}
						/>
					)}
				</button>

				<section className='task-preview-details'>

					<div className="task-preview-label-container">

						{fullLabels &&
							fullLabels.map((label) => (
								<li
									key={label.id}
									style={{ backgroundColor: `${label.color}` }}
									className="task-preview-label"
									onClick={onLabel}
								></li>
							))}
					</div>

					<p className="task-title" onClick={onTask}>
						{task.title}
					</p>

					<div className="task-preview-actions-wrapper">

						<div className="task-preview-actions">

							{currDueDate !== '' && (
								<span className="task-preview-actions-icons date">
									<AiOutlineClockCircle />
									<p>{utilService.dueDateFormat(currDueDate)}</p>
								</span>
							)}

							{task?.description && (
								<span className="task-preview-actions-icons desc">
									<GrTextAlignFull size={11} />
								</span>
							)}

							{currComments?.length !== 0 && (
								<span className="task-preview-actions-icons comment">
									<FaRegComment size={11} />
									<p>{currComments.length}</p>
								</span>
							)}


							{currAttach && currAttach.length !== 0 && (
								<span className="task-preview-actions-icons attach">
									<FiPaperclip size={11} />
									<p>{currAttach.length}</p>
								</span>
							)}

							{currCheck?.length !== 0 && (
								<span className="task-preview-actions-icons check">
									<BsCheck2Square />
									<p>{currCheck.length}</p>
								</span>
							)}

						</div>


						<div className='task-preview-actions-member-wrapper'>
							<ul className="task-preview-member-container clean-list">
								{fullMembers &&
									fullMembers.map((member) => (
										<li
											key={member._id}
											className="task-preview-member"
											onClick={onLabel}
										>
											<img
												className="member-img"
												height="28px"
												width="28px"
												src={member.imgUrl}
												alt={member.fullname}
												title={member.fullname}
											/>
										</li>
									))}
							</ul>
						</div>


					{/* <div className="task-preview-container"> */}
					{/* <div className="date-container">
						<button className="due-date-btn">
							<AiOutlineClockCircle />
						</button>
						<span className="due-date-format">
							22 Jan
						</span>

						{/* <button className="desc-btn">
							<descriptionSvg />
						</button> */}

					{/* </div> */}

					{/* </div> */}
					</div>
				</section>
			</section>
		</>
	)
}
