import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react'


import { boardService } from '../services/board.service'
import { IoClose } from "react-icons/io5";
import { removeTask, saveTask } from '../store/board.actions'
import { TaskTitle } from '../cmps/task-details-cmp/taskTitle'
import { TaskMember } from '../cmps/task-details-cmp/task-member'
import { TaskDescription } from '../cmps/task-details-cmp/task-description'
import { TaskSideBar } from '../cmps/task-details-cmp/task-side-bar'


export function TaskDetails() {
    const board = useSelector((storeState) => storeState.boardModule.board)
    const [task, setTask] = useState('')
    const { boardId, groupId, taskId } = useParams()
    const { byMember, labelIds, style, memberIds } = task


    const navigate = useNavigate()

    useEffect(() => {
        loadTask(taskId, groupId, boardId)
    }, [])

    let group = getGroup(groupId)

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
    async function onSaveEdit(ev) {
        ev.preventDefault()
        try {
            const savedTask = await saveTask(task, groupId, boardId)
            // showSuccessMsg(`Task edited (id: ${savedTask._id})`)
        } catch (err) {
            console.log('Cannot update task ', err)
            // showErrorMsg('Cannot update task ', err)
        }
    }

    function addMember() {
        console.log('add member:')

    }


    if (!task) return <h1 className='loading'>Loadings....</h1>

    return <section className='task-details'>
        <div onClick={() => navigate(`/board/${boardId}`)} className="black-screen"></div>
        <div className='task-details-section'>

            <Link to={`/board/${boardId}`} className="btn-task-exit">
                <IoClose className='icon-task exit-icon' />
                {/* <img className='icon-task exit-icon' src={exit} /> */}
            </Link>

            <div className='task-details-main-section'>
                <TaskTitle handleChange={handleChange} onSaveEdit={onSaveEdit} task={task} group={group} />

                <div className='task-details-container'>
                    <div className='task-details-edit-section'>
                        <TaskMember memberIds={memberIds} addMember={addMember} />
                        <TaskDescription handleChange={handleChange} onSaveEdit={onSaveEdit} task={task} />
                        {/* <p>Checklist</p>
                        <p>                        Activity-
                            Lorem, ipsumandae ducimus pariatur consequuntur assumenda obcaecati excepturi odio debitis, nam at! Eveniet, necessitatibus nesciunt quibusdam exercitationem ipsam nobis hic aliquam?
                        </p> */}

                    </div>
                    <TaskSideBar onRemoveTask={onRemoveTask} />

                </div>
            </div>

        </div>
    </section>
}
