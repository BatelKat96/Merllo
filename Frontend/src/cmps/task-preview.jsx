import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { ReactComponent as EditSvg } from '../assets/img/icons-task-preview/edit.svg'
import { ReactComponent as descriptionSvg } from '../assets/img/icons-task-details/description.svg'
import { AiOutlineClockCircle } from 'react-icons/ai'

export function TaskPreview({ group, task }) {
	const { boardId } = useParams()
	const navigate = useNavigate()

	function onEdit(ev) {
		console.log(ev, 'edit')
	}

	const onTask = () => {
		navigate(`/board/${boardId}/${group.id}/${task.id}`)
	}

	return (
		<>
			<section className="task-preview">
				<div className="task-label-container">
					<button className="label"></button>
				</div>

				<button className="edit-btn" onClick={onEdit}>
					<EditSvg />
				</button>

				<p className="task-title" onClick={onTask}>
					{task.title}
				</p>

				<div className="task-preview-container">
					<div className="date-container">
						<button className="due-date-btn">
							<AiOutlineClockCircle />
						</button>
						<span className="due-date-format">
							22 Jan
						</span>

						{/* <button className="desc-btn">
							<descriptionSvg />
						</button> */}

					</div>

				</div>
			</section>
		</>
	)
}
