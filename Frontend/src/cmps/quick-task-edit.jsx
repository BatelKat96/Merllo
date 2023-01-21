import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { saveTask } from '../store/board.actions'

import { MdOutlineContentCopy, MdDeleteOutline } from 'react-icons/md'

import { ReactComponent as OpenTaskSvg } from '../assets/img/icons-task-details/taskTitle.svg'
import { ReactComponent as MemberSvg } from '../assets/img/icons-task-preview/member.svg'

export function QuickTaskEdit({ taskTitle, taskId, groupId, boardId }) {
    const navigate = useNavigate()
    const [taskToEdit, setTaskToEdit] = useState()



    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setTaskToEdit((prevTask) => ({ ...prevTask, [field]: value }))
    }

    function handleKeyPress(ev) {
        if (ev.key === "Enter" && !ev.shiftKey) {
            onSaveEdit(ev)
        }
    }


    async function onSaveEdit(ev) {
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

    function prevent(e) {
        e.preventDefault();
    } 

    return (
        <>
            <section className="quick-task-edit">

                <div className="quick-task-edit-screen">
                </div>

                <section className="open-task">

                    <form>
                        <textarea
                            onClick="prevent"
                            autoFocus
                            type="text"
                            className="open-task-title"
                            name="title"
                            id="taskId"
                            spellCheck="false"
                            onChange={handleChange}
                            onKeyDown={handleKeyPress}
                            defaultValue={taskTitle} />
                        <button onClick={onSaveEdit}>Save</button>
                    </form>

                </section>

                <section className="quick-edit-btns">

                    <button onClick={onOpenCard}>
                        <OpenTaskSvg /> Open card
                    </button>

                    <button>
                        <OpenTaskSvg /> Edit labels
                    </button>

                    <button>
                        <MemberSvg /> Change members
                    </button>

                    <button>
                        <OpenTaskSvg /> Change cover
                    </button>

                    <button>
                        <OpenTaskSvg /> Move
                    </button>

                    <button>
                        <MdOutlineContentCopy /> Copy
                    </button>

                    <button>
                        <OpenTaskSvg /> Edit dates
                    </button>

                    <button>
                        <MdDeleteOutline /> Delete
                    </button>

                </section>

            </section>
        </>
    )
}