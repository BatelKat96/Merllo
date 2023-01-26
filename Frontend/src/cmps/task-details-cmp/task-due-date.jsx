import { IoIosArrowDown } from "react-icons/io";


export function TaskDueDate({ dueDate, isDone, task, onSaveTask }) {
    // console.log('updateTask:', updateTask)

    // console.log('dueDate:', dueDate)
    console.log('isDone:', isDone)

    // * for developing
    const altask = {
        // dueDate: 1674928040000, // in 2 days
        dueDate: 1674841704000, // tomorrow
        // dueDate: 1674668918000, // today
        // dueDate: 1674668930000, // yesterday
    }
    // const taskDuedate = utilService.dueDateFormat(task.dueDate)
    // const taskDuedateTime = utilService.dueDateTimeFormat(task.dueDate)
    // console.log('taskDuedate', taskDuedate)
    // console.log('taskDuedateTime', taskDuedateTime)


    function onChangeTaskDone(ev) {
        let updateTask = { ...task }
        updateTask.isDone = !updateTask.isDone
        // onSaveTask(ev, updateTask)
    }


    function getDueWarnSpan(task) {
        // if (task.isDone) {
        //   return <span className="due-sticker completed">completed</span>
        // }
        const taskDuedate = new Date(task.dueDate)
        const now = new Date()
        const msBetweenDates = taskDuedate.getTime() - now.getTime()
        const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000)
        console.log('taskDuedate', taskDuedate)
        console.log('now', now)
        console.log('hoursBetweenDates', hoursBetweenDates)
        if (hoursBetweenDates < 0) {
            console.log('overdue')
            return <span className="due-sticker overdue">overdue</span>
        }
        if (hoursBetweenDates < 24) {
            console.log('due soon')
            return <span className="due-sticker soon">due soon</span>
        }
    }

    // let isComplite = (task.isDone) ? 'complete' : ''
    // let isOnTime = ((Date.now() - dueDate) < 0) ? 'late' : ''

    return <section className='task-due-date-section'>
        <h3 className='small-headline '>Due date</h3>

        <input
            onChange={(ev) => { onChangeTaskDone(ev) }}
            checked={task.isDone}
            className="task-due-date-checkbox"
            type="checkbox"
            id={task.id}
        />
        <button>
            {dueDate}
            {/* <span className={`task-due-date-time ${isOnTime} `}>{isComplite}</span> */}
            {/* <span>{taskDuedateTime}</span> */}
            {/* {getDueWarnSpan(task)} */}
            <IoIosArrowDown />
        </button>

    </section>


}