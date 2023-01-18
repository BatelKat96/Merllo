import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { ImgUploader } from '../cmps/img-uploader'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { taskService } from '../services/task.service'
// import { plus, taskTitle } from '../services/svg.service'
// import { titleCard } from '../assets/img/icons-task-details/'
import taskTitle from '../assets/img/icons-task-details/taskTitle.svg'
import plus from '../assets/img/icons-task-details/plus.svg'

export function TaskDetails() {


    const [task, setTask] = useState('')
    const { taskId } = useParams()
    const { byMember, labelIds, style, memberIds } = task
    // console.log('byMember:', byMember)

    const navigate = useNavigate()

    console.log('taskId:', taskId)

    useEffect(() => {
        logTask()
    }, [])

    async function logTask() {
        try {
            console.log('he:')

            const task = await taskService.getById(taskId)
            console.log('task:', task)

            setTask(task)
        }
        catch (err) {
            console.log('err:', err)

            showErrorMsg('Cannot load task')
            navigate('/board/:boardId')
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
            const savedTask = await taskService.save(task)
            showSuccessMsg(`Task edited (id: ${savedTask._id})`)
            navigate('/board/:boardId')
        } catch (err) {
            showErrorMsg('Cannot update task ', err)
            navigate('/board/:boardId')
        }
    }
    // console.log('task.byMember:', task.byMember)


    if (!task) return <h1 className='loading'>Loadings....</h1>
    return <section className='task-details-section'>
        <div className='task-details-container'>

            <div className='task-title-container'>

                <img className='icon ' src={taskTitle} />
                {/* <img className='icon ' src={require({ plus })} /> */}
                {/* <img className='icon ' src={taskTitle} /> */}
                <form onSubmit={onSaveEdit}>
                    <textarea type="text"
                        className='title'
                        name="title"
                        id="title"
                        onChange={handleChange}
                        defaultValue={task.title}
                    />
                </form >
                <p>in line development</p>
            </div>
            <div className='task-members-container'>
                <h3 className='small-headline'>Members</h3>
                <ul className='members-list clean-list'>
                    {memberIds && memberIds.map(member =>
                        <li key={member}>
                            <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" alt={member} title={member} />
                        </li>

                    )}

                    <li key="add-more" className='add-member' title="Add another member" onClick={() => { '#' }} >
                        <img className='icon plus' src={plus} />
                        {/* NOGAAAAAAAAA */}
                    </li>

                    {/* <img src={byMember.imgUrl} alt={byMember.username} /> onclick to add memeber */}
                </ul>
            </div>
            <br />


            <br />
            <form onSubmit={onSaveEdit}>
                <label htmlFor="description" className='medium-headline'>Description:</label>
                <textarea
                    name="description"
                    id="description"
                    onChange={handleChange}
                    defaultValue={task.description}
                ></textarea>
                <br />


                <br />

                <button className='btn clean-btn'>Save</button>
                <Link to="/toy" className="btn">Back to List</Link>

            </form >
            <ImgUploader />

        </div>
    </section>
}
