import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { ReactComponent as EditSvg } from '../assets/img/icons-task-preview/edit.svg'


export function TaskPreview({ task }) {



    return (
        <section className="task-preview">

            <div className="task-label-container">

                <button className="label"></button>
            </div>

            <button className="edit-btn">
                <EditSvg />
            </button>

            <p className="task-title">{task.title}</p>

            {/* <form onSubmit={onSaveEdit}>
                <textarea type="text"
                    className="title"
                    name="title"
                    id="title"
                    onChange={handleChange}
                    defaultValue={task.title}
                />
            </form > */}

            <Link to={`/board/:boardId/:groupId/${task.id}`}>Edit task</Link>

        </section>)
}