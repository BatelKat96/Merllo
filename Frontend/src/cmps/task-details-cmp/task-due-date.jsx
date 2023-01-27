import { IoIosArrowDown } from "react-icons/io";
import { utilService } from '../../services/util.service';


export function TaskDueDate({ dueDate, isDone, task, onSaveTask }) {
    // console.log('updateTask:', updateTask)

    // console.log('dueDate:', dueDate)
    // console.log('isDone:', isDone)

    // * for developing
    const altask = {
        // dueDate: 1674928040000, // in 2 days
        dueDate: 1674841704000, // tomorrow
        // dueDate: 1674668918000, // today
        // dueDate: 1674668930000, // yesterday
    }
    const taskDuedate = utilService.dueDateFormat(task.dueDate)
    const taskDuedateTime = utilService.dueDateTimeFormat(task.dueDate)
    // console.log('taskDuedate', taskDuedate)
    // console.log('taskDuedateTime', taskDuedateTime)

    let updateTask = { ...task }

    function onChangeTaskDone(ev) {
        updateTask.isDone = !updateTask.isDone
        onSaveTask(ev, updateTask)
    }


    function getDueWarnSpan(task) {
        if (task.isDone) {
            return <span className="due-sticker completed">completed</span>
        }
        const taskDuedate = new Date(task.dueDate)
        const now = new Date()
        const msBetweenDates = taskDuedate.getTime() - now.getTime()
        const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000)
        // console.log('taskDuedate', taskDuedate)
        // console.log('now', now)
        // console.log('hoursBetweenDates', hoursBetweenDates)
        if (hoursBetweenDates < 0) {
            console.log('overdue')
            return <span className="due-sticker overdue">overdue</span>
        }
        if (hoursBetweenDates < 24) {
            console.log('due soon')
            return <span className="due-sticker soon">due soon</span>
        }
    }

    function open() {
        console.log('he:')
        /// add open modal

    }


    // let isComplite = (task.isDone) ? 'complete' : ''
    // let isOnTime = ((Date.now() - dueDate) < 0) ? 'late' : ''

    return <section className='task-due-date-section'>
        <h3 className='small-headline'>Due date</h3>
        <div className='task-due-date-container'>
            <input
                onChange={(ev) => { onChangeTaskDone(ev) }}
                checked={task.isDone}
                className="task-due-date-checkbox"
                type="checkbox"
                id={task.id}
            />
            <button className='clean-btn task-due-date-show' onClick={open}>
                <span className='task-due-date-span'>{taskDuedateTime} {getDueWarnSpan(updateTask)}</span>
                <IoIosArrowDown className='btn-due-date-arrow' />
            </button>
        </div>
    </section>


}