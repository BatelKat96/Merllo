import { IoIosArrowDown } from "react-icons/io";
import { utilService } from '../../services/util.service';


export function TaskDueDate({ task, onSaveTask }) {

    // const taskDuedate = utilService.dueDateFormat(task.dueDate)
    const taskDuedateTime = utilService.dueDateTimeFormat(task.dueDate)


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