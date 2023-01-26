import taskTitle from '../../assets/img/icons-task-details/taskTitle.svg'
import { AiOutlineEye } from "react-icons/ai";

export function TaskTitle({ handleChange, onSaveEdit, task, group }) {
    // console.log('groupTitle:', { group })

    return <section className='task-title-container'>
        <div>
            <img className='icon-task title-icon' src={taskTitle} />
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
            <p>in list {group.title}</p>

        </div>
    </section>
}