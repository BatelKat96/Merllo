import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Fragment, useEffect, useState, useRef } from 'react'

import { boardService } from '../services/board.service'

import { IoClose } from 'react-icons/io5'
import { BsArchive, BsPerson, BsCheck2Square, BsSquareHalf, BsArrowCounterclockwise } from "react-icons/bs"

import { loadBoard, removeTask, saveTask } from '../store/board.actions'
import { TaskTitle } from '../cmps/task-details-cmp/task-title'
import { TaskMember } from '../cmps/task-details-cmp/task-member'
import { TaskDescription } from '../cmps/task-details-cmp/task-description'
import { TaskSideBar } from '../cmps/task-details-cmp/task-side-bar'
import { TaskCmpDynamoic } from '../cmps/task-details-cmp/task-cmp-dynamic'
import { TaskDynamicItem } from '../cmps/task-details-cmp/task-dynamic-item'
import { TaskChecklistPreview } from '../cmps/task-details-cmp/task-checklist/task-checklist-preview'
import Loader from '../assets/img/loader.svg'


export function TaskDetails() {
    const { boardId, groupId, taskId } = useParams()
    const board = useSelector((storeState) => storeState.boardModule.board)
    const [task, setTask] = useState('')
    const { byMember, labelIds, style, checklists, memberIds } = task
    const [modalType, setModalType] = useState()
    const coverBtn = useRef()

    let coverClose = (task.style) ? 'close-hover' : ''

    const navigate = useNavigate()

    useEffect(() => {
        if (!board) loadBoard(boardId)
        loadTask(taskId, groupId, boardId)
    }, [])

    function getGroup(groupId) {
        let groups = board.groups
        let currGroup = groups.find((grp) => grp.id === groupId)
        return currGroup
    }


    async function loadTask(taskId, groupId, boardId) {
        try {
            const task = await boardService.getTaskById(taskId, groupId, boardId)
            setTask(task)
        } catch (err) {
            console.log('Failed to load task', err)
            throw err
        }
    }

    function handleChange({ target }) {
        console.log(':')

        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setTask((prevTask) => ({ ...prevTask, [field]: value }))
    }

    async function onRemoveTask() {
        try {
            console.log('remove:')
            const removedTask = await removeTask(taskId, groupId, boardId)
            console.log('removedTask:', removedTask)
            navigate(`/board/${boardId}`)
            // showSuccessMsg(`Task edited (id: ${removedTask._id})`)
        } catch (err) {
            console.log('Cannot remove task ', err)
            // showErrorMsg('Cannot update task ', err)
        }
    }

    async function onCopyTask() {
        let copyTask = { ...task }
        copyTask.id = null
        try {
            await saveTask(copyTask, groupId, boardId)
        } catch (err) {
            console.log('Cannot copy task', err)
        }
    }

    /// not good
    function onSaveEdit(ev) {
        ev.preventDefault()
        saveTask(task, groupId, boardId)
    }

    function onSaveTask(ev, updateTask) {
        ev.preventDefault()
        setTask(updateTask)
        saveTask(updateTask, groupId, boardId)
    }

    function onCloseTaskDetails(ev) {
        ev.preventDefault()
        navigate(`/board/${boardId}`)
    }

    function onStopPropagation(ev) {
        ev.stopPropagation()
    }

    function onOpenModal(type) {
        setModalType(type)
    }


    return (
        <section className='task-details'>
            <div
                onClick={(ev) => onCloseTaskDetails(ev)}
                className="black-screen"
            >
                <div className="task-details-section" onClick={(ev) => { onStopPropagation(ev) }}>
                    {(!task || !board) && <div className="loader-wrapper"><img className="loader" src={Loader} alt="loader" /></div>}

                    {(task && board) && <Fragment>
                        <span
                            onClick={(ev) => onCloseTaskDetails(ev)}
                            className={`clean-btn btn-task-exit ${coverClose}`}>
                            <IoClose className="icon-task exit-icon" />
                        </span>

                        {task.style?.backgroundColor && (
                            <section
                                className="task-cover"
                                style={{ backgroundColor: task.style.backgroundColor }}
                            >
                                <button className='clean-btn  btn-task-cover'
                                    style={{ top: 60 }}
                                    ref={coverBtn}
                                    onClick={() => onOpenModal('cover')}
                                >
                                    <span className='btn-side-bar-icon btn-side-bar-icon-label'>
                                        <BsSquareHalf />
                                    </span>
                                    Cover
                                </button>
                            </section>
                        )}

                        {task.style?.background && (
                            <section className="task-cover img"
                                style={{ background: task.style.background }}
                            >
                                <button className='clean-btn btn-task-cover'
                                    style={{ top: 104 }}
                                    ref={coverBtn}
                                    onClick={() => onOpenModal('cover')}
                                >
                                    <span>
                                        <BsSquareHalf />
                                    </span>
                                    Cover
                                </button>
                            </section>
                        )}


                        <div className='task-details-main-section'>
                            <TaskTitle handleChange={handleChange} onSaveEdit={onSaveEdit} task={task} group={getGroup(groupId)} />

                            <div className='task-details-container'>
                                <div className='task-details-edit-section'>
                                    <div className='task-details-edit-item'>
                                        {(memberIds && (memberIds.length > 0)) && <TaskDynamicItem ids={memberIds} board={board} type={'members'} />}
                                        {(labelIds && (labelIds.length > 0)) && < TaskDynamicItem ids={labelIds} board={board} type={'labels'} />}
                                    </div>

                                    <TaskDescription handleChange={handleChange} onSaveEdit={onSaveEdit} task={task} />
                                    {(checklists && (checklists.length > 0)) && <TaskChecklistPreview onSaveEdit={onSaveEdit} task={task} onSaveTask={onSaveTask} />}


                                </div>
                                <TaskSideBar
                                    task={task}
                                    onRemoveTask={onRemoveTask}
                                    onCopyTask={onCopyTask}
                                    onSaveTask={onSaveTask}
                                />
                            </div>
                        </div>
                    </Fragment>}
                </div>
            </div>

            {modalType && <TaskCmpDynamoic
                cmpType={modalType}
                refDataBtn={coverBtn}
                task={task}
                groupId={groupId}
                boardId={boardId}
                onOpenModal={onOpenModal}
                onSaveTask={onSaveTask} />}
        </section>


    )
}
