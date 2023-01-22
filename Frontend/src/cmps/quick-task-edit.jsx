import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { saveTask, removeTask } from '../store/board.actions'

import { TiTag } from "react-icons/ti";

import { ReactComponent as OpenTaskSvg } from '../assets/img/icons-task-details/taskTitle.svg'
import { ReactComponent as MemberSvg } from '../assets/img/icons-task-preview/member.svg'
import { ReactComponent as CopySvg } from '../assets/img/icons-task-preview/copy.svg'
import { ReactComponent as DeleteSvg } from '../assets/img/icons-task-preview/delete.svg'

export function QuickTaskEdit({ task, taskId, groupId, boardId, toggleQuickTaskEdit }) {
    const navigate = useNavigate()
    const [taskToEdit, setTaskToEdit] = useState(task)


    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setTaskToEdit((prevTask) => ({ ...prevTask, [field]: value }))
    }

    function handleKeyPress(ev) {
        if (ev.key === "Enter" && !ev.shiftKey) {
            onSaveEdit()
            toggleQuickTaskEdit()
        }
    }


    async function onSaveEdit() {
        try {
            await saveTask(taskToEdit, groupId, boardId)
        } catch (err) {
            console.log('Cannot update task ', err)
        }
    }

    async function onCopyTask() {
        let copyTask = { ...taskToEdit }
        copyTask.id = null
        try {
            await saveTask(copyTask, groupId, boardId)
        } catch (err) {
            console.log('Cannot copy task', err)
        }
    }


    async function onRemoveTask() {
        try {
            await removeTask(taskId, groupId, boardId)
            navigate(`/board/${boardId}`)
        } catch (err) {
            console.log('Cannot remove task ', err)
        }
    }


    const onOpenCard = () => {
        navigate(`/board/${boardId}/${groupId}/${taskId}`)
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
                            defaultValue={task.title} />
                        <button onClick={onSaveEdit}>Save</button>
                    </form>

                </section>

                <section className="quick-edit-btns">

                    <button onClick={onOpenCard}>
                        <OpenTaskSvg /> Open card
                    </button>

                    <button>
                        <TiTag className="tag-svg" /> Edit labels
                    </button>

                    <button>
                        <MemberSvg /> Change members
                    </button>

                    {/* <button>
                        <OpenTaskSvg /> Change cover
                    </button> */}

                    {/* <button>
                        <OpenTaskSvg /> Move
                    </button> */}

                    <button onClick={onCopyTask}>
                        <CopySvg className="copy-svg" /> Copy
                    </button>

                    {/* <button>
                        <OpenTaskSvg /> Edit dates
                    </button> */}

                    <button onClick={onRemoveTask}>
                        <DeleteSvg /> Delete
                    </button>

                </section>

            </section>
        </>
    )
}