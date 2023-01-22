import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { QuickTaskEdit } from './quick-task-edit'
import { boardService } from '../services/board.service'

import { ReactComponent as EditSvg } from '../assets/img/icons-task-preview/edit.svg'
import { ReactComponent as descriptionSvg } from '../assets/img/icons-task-details/description.svg'
import { AiOutlineClockCircle } from 'react-icons/ai'

export function TaskPreview({ group, task }) {
	const { boardId } = useParams()
	const navigate = useNavigate()

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
					<button className="label" onClick={onLabel}></button>
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
