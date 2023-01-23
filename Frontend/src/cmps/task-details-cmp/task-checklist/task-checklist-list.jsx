import { Fragment } from 'react'

export function TaskChecklistList({ todos, onChangeTodoDone }) {

    console.log('todos:', todos)

    return <Fragment>

        {todos.map(todo => {
            { console.log('todo:', todo) }

            return <li key={todo.id} className="task-checklist-todo">

                <input
                    onChange={(ev) => { onChangeTodoDone(ev, todo.id) }}
                    checked={todo.isDone}
                    className="task-checklist-checkbox"
                    type="checkbox"
                    id={todo.id}
                />
                <label htmlFor={todo.id} className="task-checklist-label">
                    {todo.title}
                </label>
            </li>

        })}

    </Fragment>
}