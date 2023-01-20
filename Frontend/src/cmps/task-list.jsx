import { useState } from 'react'
import { useSelector } from 'react-redux'

import { TaskPreview } from './task-preview'
import { boardService } from '../services/board.service'
import { saveTask } from '../store/board.actions'

import { IoClose } from 'react-icons/io5'
import { AiOutlinePlus } from 'react-icons/ai'
import { FiMoreHorizontal } from 'react-icons/fi'

export function TaskList({ group, tasks }) {
    const board = useSelector((storeState) => storeState.boardModule.board)

    const [taskToEdit, setTaskToEdit] = useState(boardService.getEmptyTask())

    const [isAddNewTaskOpen, setIsAddNewTaskOpen] = useState(false)

    function handleNewTask({ target }) {
        let { value, name: field } = target
        setTaskToEdit((prevTask) => ({ ...prevTask, [field]: value }))
    }

    function closeAddNewTask() {
        setIsAddNewTaskOpen(false)
    }

    function openAddNewTask() {
        setIsAddNewTaskOpen(true)
    }

    function handleKeyPress(ev) {
        if (ev.key === "Enter" && !ev.shiftKey) {
            onAddTask(ev)
        }
    }

    async function onAddTask(ev) {
        ev.preventDefault()
        if (!taskToEdit.title) return
        try {
            await saveTask(taskToEdit, ev.target.id, board._id)
            setTaskToEdit(boardService.getEmptyTask())
            closeAddNewTask()
        } catch (err) {
            console.log('Failed to save new task', err)
        }
    }


    return (
        <>
        <section className="task-lis1">

            <ul className="task-list clean-list">
                {tasks.map(task =>

                    <li key={task.id}>
                        <TaskPreview group={group} task={task} />
                    </li>)}
            </ul>

                <section className="task-list-bottom">

                    {!isAddNewTaskOpen &&

                        <div className="add-a-task-template">
                            <button
                                className="add-a-task"
                                onClick={openAddNewTask}>
                                <AiOutlinePlus className="icon-plus" /> Add a card
                            </button>

                            {/* <button className="btn-group template">template</button> */}
                        </div>
                    }

                    {isAddNewTaskOpen &&

                        <div className="task-composer">

                            <form>
                                <textarea
                                    className="task-textarea"
                                    type="text"
                                    name="title"
                                    id={group.id}
                                    placeholder="Enter a title for this card..."
                                    maxLength="512"
                                    spellCheck="false"
                                    value={taskToEdit.title}
                                    onKeyDown={handleKeyPress}
                                    onChange={handleNewTask}
                                ></textarea>

                                <div className="add-task-controls">
                                    <button
                                        className="add-task-btn"
                                        id={group.id}
                                        onClick={onAddTask}>
                                        Add Card
                                    </button>
                                    <a
                                        className="cancel-btn"
                                        onClick={closeAddNewTask}
                                    >
                                        <IoClose className="icon-close" />
                                    </a>
                                </div>

                            </form>

                        </div>
                    }

                </section>
            </section>
        </>)
}