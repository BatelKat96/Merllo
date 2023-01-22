import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { QuickTaskEdit } from './quick-task-edit'
import { boardService } from '../services/board.service'

import { utilService } from '../services/util.service'
import { ReactComponent as EditSvg } from '../assets/img/icons-task-preview/edit.svg'
import { ReactComponent as descriptionSvg } from '../assets/img/icons-task-details/description.svg'
import { AiOutlineClockCircle } from 'react-icons/ai'
import description from '../assets/img/icons-task-details/description.svg'


export function TaskPreview({ group, task, board }) {
	const { boardId } = useParams()
	const navigate = useNavigate()
	const currLabels = task.labelIds
	const currMembers = (task.memberIds)

	var fullLabels = currLabels ? utilService.findDataById(currLabels, board, 'labels') : ''
	var fullMembers = currMembers ? utilService.findDataById(currMembers, board, 'members') : ''


	const [quickTaskEdit, toggleQuickTaskEdit] = useState(false)

	function onQuickTaskEdit(ev) {
		ev.stopPropagation()
		ev.preventDefault()
		toggleQuickTaskEdit(!quickTaskEdit)
	}

	const onTask = () => {
		navigate(`/board/${boardId}/${group.id}/${task.id}`)
	}

	function onLabel(ev) {
		ev.stopPropagation()

	}


	return (
		<>
			<section className="task-preview" onClick={onTask}>
				<div className="task-label-container">
					{fullLabels && fullLabels.map(label =>
						<li key={label.id} style={{ backgroundColor: `${label.color}` }} className="label" onClick={onLabel}>
						</li>
					)}
				</div>

				<a className="edit-btn" onClick={onQuickTaskEdit}>
					<EditSvg />
					{quickTaskEdit && <QuickTaskEdit taskId={task.id}
						groupId={group.id}
						boardId={boardId}
						task={task}
						onEdit={onQuickTaskEdit}
						toggleQuickTaskEdit={toggleQuickTaskEdit}
						quickTaskEdit={quickTaskEdit} />}
				</a>

				<p className="task-title" onClick={onTask}>
					{task.title}
				</p>

				<div className="task-preview-actions ">
					{task.description && <img className='task-preview-description-icon' src={description} />}
					<ul className="task-member-container clean-list">
						{fullMembers && fullMembers.map(member =>
							<li key={member._id} className="member" onClick={onLabel}>
								<img className='member-img' src={require(`../assets/img/members-task-details/${member.imgUrl}`)} alt={member.fullname} title={member.fullname} />

							</li>
						)}
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
		</>
	)
}
