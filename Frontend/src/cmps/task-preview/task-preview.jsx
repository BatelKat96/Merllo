import { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { QuickTaskEdit } from './quick-task-edit'

import { utilService } from '../../services/util.service'
import { ReactComponent as EditSvg } from '../../assets/img/icons-task-preview/edit.svg'
import descriptionIcon from '../../assets/img/icons-task-details/description-icon.svg'

export function TaskPreview({ group, task, board }) {
	const { boardId } = useParams()
	const navigate = useNavigate()

	const [quickTaskEdit, toggleQuickTaskEdit] = useState(false)

	const quickEditBtn = useRef()

	const currLabels = task.labelIds
	const currMembers = task.memberIds
	const currCover = task.style


	var fullMembers = currMembers
		? utilService.findDataById(currMembers, board, 'members')
		: ''

	var fullLabels = currLabels
		? utilService.findDataById(currLabels, board, 'labels')
		: ''

	function onQuickTaskEdit(ev) {
		ev.stopPropagation()
		ev.preventDefault()
		toggleQuickTaskEdit(!quickTaskEdit) 
	}

	function onTask() {
		navigate(`/board/${boardId}/${group.id}/${task.id}`)
	}

	function onLabel(ev) {
		ev.stopPropagation()
	}

	return (
		<>
			<section className="task-preview" onClick={onTask}>

				{task.style?.backgroundColor && (
					<div
						className="task-preview-cover"
						style={currCover}>
					</div>
				)}

				{task.style?.background && (
					<div
						className="task-preview-cover img"
						style={currCover}>
					</div>
				)}

				<a className="edit-btn"
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
				</a>

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

					<div className="task-preview-actions ">
						{task.description && (
							<img className="task-preview-description-icon" src={descriptionIcon} />
						)}
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
											height="30px"
											width="30px"
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
				</section>
			</section>
		</>
	)
}
