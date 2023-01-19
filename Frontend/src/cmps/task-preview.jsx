import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { ReactComponent as EditSvg } from '../assets/img/icons-task-preview/edit.svg'

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
			</section>
		</>
	)
}
