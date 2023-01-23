import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { boardService } from '../services/board.service'

import { IoClose } from 'react-icons/io5'
import { loadBoard, removeTask, saveTask } from '../store/board.actions'
import { TaskTitle } from '../cmps/task-details-cmp/task-title'
import { TaskMember } from '../cmps/task-details-cmp/task-member'
import { TaskDescription } from '../cmps/task-details-cmp/task-description'
import { TaskSideBar } from '../cmps/task-details-cmp/task-side-bar'
import { TaskCmpDynamoic } from '../cmps/task-details-cmp/task-cmp-dynamic'
import { TaskDynamicItem } from '../cmps/task-details-cmp/task-dynamic-item'
import { TaskChecklistPreview } from '../cmps/task-details-cmp/task-checklist/task-checklist-preview'

export function TaskDetails() {
	const { boardId, groupId, taskId } = useParams()
	const board =
		useSelector((storeState) => storeState.boardModule.board) ||
		loadBoard(boardId)
	const [task, setTask] = useState('')
	const { byMember, labelIds, style, checklists, memberIds } = task
	console.log('checklists:', checklists)

	const navigate = useNavigate()

	useEffect(() => {
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

    async function onSaveEdit(ev) {
        ev.preventDefault()
        try {
            console.log('in:')

            const savedTask = await saveTask(task, groupId, boardId)
            // showSuccessMsg(`Task edited (id: ${savedTask._id})`)
        } catch (err) {
            console.log('Cannot update task ', err)
            // showErrorMsg('Cannot update task ', err)
        }
    }



    if (!task) return <h1 className='loading'></h1>
    return <section className='task-details'>
        <div onClick={() => navigate(`/board/${boardId}`)} className="black-screen"></div>


        <div className='task-details-section'>

            <Link to={`/board/${boardId}`} className="btn-task-exit">
                <IoClose className='icon-task exit-icon' />
            </Link>

			{task.style?.bgColor && (
				<section
					className="task-cover"
					style={{ backgroundColor: task.style.bgColor }}
				></section>
			)}

			{task.style?.coverImg && (
				<section className="task-cover">
					<img src={task.style.coverImg} alt="Background cover" />
				</section>
			)}

			{/* <div className='stam'> */}

            <div className='task-details-main-section'>
                <TaskTitle handleChange={handleChange} onSaveEdit={onSaveEdit} task={task} group={getGroup(groupId)} />

                <div className='task-details-container'>
                    <div className='task-details-edit-section'>
                        <div className='task-details-edit-item'>
                            {memberIds && <TaskDynamicItem ids={memberIds} board={board} type={'members'} />}
                            {labelIds && <TaskDynamicItem ids={labelIds} board={board} type={'labels'} />}
                            {/* {<TaskDynamicItem ids={labelIds} add={addLabel} board={board} type={'notifications'} />} */}
                        </div>

                        <TaskDescription
                            handleChange={handleChange}
                            onSaveEdit={onSaveEdit}
                            task={task} />

                        <TaskDescription handleChange={handleChange} onSaveEdit={onSaveEdit} task={task} />
                        {checklists && <TaskChecklistPreview onSaveEdit={onSaveEdit} task={task} />}

                        {/* <p>Checklist</p>
                        <p>                        Activity-
                            Lorem, ipsumandae ducimus pariatur consequuntur assumenda obcaecati excepturi odio debitis, nam at! Eveniet, necessitatibus nesciunt quibusdam exercitationem ipsam nobis hic aliquam?
                        </p> */}
						</div>
						<TaskSideBar
							task={task}
							onRemoveTask={onRemoveTask}
							onCopyTask={onCopyTask}
						/>
					</div>
					{/* <TaskCmpDynamoic cmpType={'members'} /> */}
				</div>
			</div>
		{/* </div> */}
	</section>
}
