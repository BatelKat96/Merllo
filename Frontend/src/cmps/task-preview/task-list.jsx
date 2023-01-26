import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { boardService } from '../../services/board.service'
import { saveTask } from '../../store/board.actions'
import { TaskPreview } from './task-preview'

import { IoClose } from 'react-icons/io5'
import { BsPlusLg } from 'react-icons/bs'
import { FiMoreHorizontal } from 'react-icons/fi'

export function TaskList({ group, handleOnDragEnd }) {
    const board = useSelector((storeState) => storeState.boardModule.board)
    const { boardId, groupId } = useParams()
    const tasks = group.tasks

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
            <section className="task-list-wraper">

                {/* <DragDropContext onDragEnd={(result) => handleOnDragEnd(result, group)}> */}
                <Droppable droppableId={group.id}
                    key="tasks"
                    type="tasks"
                >
                    {(provided, snapshot) => (

                            <ul className="task-list clean-list tasks"
                                {...provided.droppableProps}
                            ref={provided.innerRef}
                        // isDraggingOver={snapshot.isDraggingOver}
                        >

                                {tasks.map((task, index) =>

                                    <Draggable
                                        key={task.id}
                                        group={group.id}
                                        type={task}
                                        draggableId={task.id}
                                        index={index}>

                                        {(provided, snapshot) => (

                                            <li key={task.id}
                                                ref={provided.innerRef}
                                                // isdragging={snapshot.isDragging}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >

                                                <TaskPreview
                                                    group={group}
                                                    task={task}
                                                    board={board}
                                                />
                                            </li>)}

                                    </Draggable>
                                )}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                {/* </DragDropContext> */}

            </section>

            <section className="task-list-bottom">

                {!isAddNewTaskOpen &&

                    <div className="add-a-task-template">
                        <button
                            className="add-a-task"
                            onClick={openAddNewTask}>
                            <BsPlusLg className="icon-plus" /> Add a card
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

                            <div className="add-task-btns">

                                <div className="add-btns">
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

                                <div className="more-btns">

                                    <a
                                        className="more-btn"
                                        onClick={closeAddNewTask}
                                    >
                                        <FiMoreHorizontal className="icon-close" />
                                    </a>
                                </div>

                            </div>

                        </form>

                    </div>
                }

            </section>
        </>)
}