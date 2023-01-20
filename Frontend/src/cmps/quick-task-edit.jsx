import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { boardService } from '../services/board.service'
import { saveTask } from '../store/board.actions'



export function QuickTaskEdit({ taskTitle, taskId, groupId, boardId }) {
    const navigate = useNavigate()
    const [task, setTask] = useState('')


    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setTask((prevTask) => ({ ...prevTask, [field]: value }))
    }

    function handleKeyPress(ev) {
        if (ev.key === "Enter" && !ev.shiftKey) {
            onSaveEdit(ev)
        }
    }

    async function onSaveEdit(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        try {
            const savedTask = await saveTask(taskId, groupId, boardId)
        } catch (err) {
            console.log('Cannot update task ', err)
        }
    }

    const onOpenCard = () => {
        navigate(`/board/${boardId}/${groupId}/${taskId}`)
    }

    return (
        <>
            <section className="quick-task-edit">

                <div
                    onClick={() => navigate(`/board/${boardId}`)}
                    className="quick-task-edit-screen"></div>

                <section className="open-task">

                    <form onBlurCapture={onSaveEdit}>
                        <textarea autofocus
                            type="text"
                            className="open-task-title"
                            name="title"
                            id="title"
                            spellCheck="false"
                            onChange={handleChange}
                            onKeyDown={handleKeyPress}
                            defaultValue={taskTitle}
                        />
                        <button onClick={onSaveEdit}>Save</button>
                    </form>

                </section>

                {/* <section className="quick-edit-btns">
                    <button onClick={onOpenCard}>Open card</button>
                    <button>Edit labels</button>
                    <button>Change members</button>
                    <button>Change cover</button>
                    <button>Move</button>
                    <button>Copy</button>
                    <button>Edit dates</button>
                    <button>Delete</button>
                </section> */}
            </section>
        </>
    )
}