import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// import { taskService } from '../services/task.service'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { ReactComponent as EditSvg } from '../assets/img/icons-task-preview/edit.svg'


export function TaskPreview({ task }) {

    const [updateTask, setTask] = useState('')
    const navigate = useNavigate()


    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setTask((prevToy) => ({ ...prevToy, [field]: value }))
    }

    // async function onSaveEdit(ev) {
    //     ev.preventDefault()
    //     try {
    //         // const savedTask = await taskService.save(updateTask)
    //         showSuccessMsg(`Task edited (id: ${savedTask._id})`)
    //         navigate('/board/:boardId')
    //     } catch (err) {
    //         showErrorMsg('Cannot update task ', err)
    //         navigate('/board/:boardId')
    //     }
    // }


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

            <Link to="/board/:boardId/:groupId/:taskId">Edit task</Link>

        </section>)
}