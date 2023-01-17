import { Link } from 'react-router-dom';

export function TaskPreview() {
    return <section className='task-preview'>
        <Link to="/board/:boardId/:taskId"> Edit task</Link>
    </section>
}