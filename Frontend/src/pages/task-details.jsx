import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { boardService } from '../services/board.service'

import { ImgUploader } from '../cmps/img-uploader'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
// import { plus, taskTitle } from '../services/svg.service'
// import { titleCard } from '../assets/img/icons-task-details/'
import taskTitle from '../assets/img/icons-task-details/taskTitle.svg'
import plus from '../assets/img/icons-task-details/plus.svg'
import description from '../assets/img/icons-task-details/description.svg'
import { saveTask } from '../store/board.actions'

export function TaskDetails() {
    const [task, setTask] = useState('')
    const { boardId, groupId, taskId } = useParams()
    const { byMember, labelIds, style, memberIds } = task
    // const board = useSelector((storeState) => storeState.boardModule.board)

    const navigate = useNavigate()

    console.log('groupId:', groupId)
    console.log('taskId:', taskId)
    console.log('boardId:', boardId)

    useEffect(() => {
        loadTask(taskId, groupId, boardId)
    }, [])


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
        setTask((prevToy) => ({ ...prevToy, [field]: value }))
    }

    async function onSaveEdit(ev) {
        ev.preventDefault()
        try {
            const savedTask = await saveTask(task, groupId, boardId)
            showSuccessMsg(`Task edited (id: ${savedTask._id})`)
            // navigate('/board/:boardId')
        } catch (err) {
            showErrorMsg('Cannot update task ', err)
            // navigate('/board/:boardId')
        }
    }

    function addMember() {
        console.log('add member:')

    }
    console.log('task.byMember:', task)


    if (!task) return <h1 className='loading'>Loadings....</h1>
    return <section className='task-details-section'>
        <div className='task-details-container'>

            <img className='icon title-icon' src={taskTitle} />
            <div className='task-title-container'>
                <form onBlurCapture={onSaveEdit}>
                    <input type="text"
                        className='title'
                        name="title"
                        id="title"
                        onChange={handleChange}
                        defaultValue={task.title}
                    />
                </form >
                <p>in list <span>line development</span></p>
            </div>


            <div className='task-members-container'>
                <h3 className='small-headline'>Members</h3>
                <ul className='members-list clean-list'>
                    {memberIds && memberIds.map(member =>
                        <li key={member}>
                            <img className='member' src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" alt={member} title={member} />
                        </li>

                    )}

                    <li key="add-more" className='add-member' title="Add another member" onClick={() => { '#' }} >
                        <img className='add-member-icon' src={plus} onClick={() => { addMember() }} />
                    </li>

                    {/* <img src={byMember.imgUrl} alt={byMember.username} /> onclick to add memeber */}
                </ul>
            </div>
            <br />


            {/* <div className='task-description-container'> */}
            <img className='icon description-icon' src={description} />

            <div className="task-description-input">
                <form onSubmit={onSaveEdit}>
                    <label htmlFor="description" className='medium-headline'>Description</label>
                    <textarea
                        name="description"
                        className='description'
                        id="description"
                        onChange={handleChange}
                        defaultValue={task.description}
                        placeholder="Add a more detailed description..."
                    ></textarea>


                    {/* <button className='btn clean-btn'>Save</button>
                    <Link to="/toy" className="btn">Back to List</Link> */}

                </form >
            </div>
            {/* </div> */}
            {/* <ImgUploader /> */}

        </div>
    </section>
}
