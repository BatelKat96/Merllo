import { TaskPreview } from './task-preview';

export function TaskList({ group, tasks }) {


    return (
        <section className="task-lis1">

            <ul className="task-list clean-list">
                {tasks.map(task =>

                    <li key={task.id}>
                        <TaskPreview group={group} task={task} />
                    </li>)}
            </ul>

        </section>)
}