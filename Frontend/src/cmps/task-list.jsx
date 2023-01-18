import { TaskPreview } from './task-preview';

export function TaskList({ tasks }) {


    return (
        <section>

            <ul className="task-list clean-list">
                {tasks.map(task =>

                    <li key={task.id}>
                        <TaskPreview task={task} />
                    </li>)}
            </ul>

        </section>)
}