import { Link } from 'react-router-dom';

export function TaskPreview({ task }) {
    return (
        <section className="task-preview">

            {task.title}

        <Link to="/board/:boardId/:taskId"> Edit task</Link>

        </section>)
}