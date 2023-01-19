import taskTitle from '../../assets/img/icons-task-details/taskTitle.svg'

export function TaskTitle({ handleChange, onSaveEdit, task, }) {

    return <section className='task-title-container'>
        <div>

            <img className='icon title-icon' src={taskTitle} />
        </div>
        <div>

            <form onBlurCapture={onSaveEdit}>
                <input type="text"
                    className='task-details-title'
                    name="title"
                    id="title"
                    onChange={handleChange}
                    defaultValue={task.title}
                />
            </form >
            <p>in list <span>line development</span></p>
        </div>
    </section>
}