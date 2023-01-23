import { Fragment, useState } from 'react'

export function TaskChecklistList({ todos, checklist, onSaveEdit }) {
    // console.log('todos:', todos)
    console.log('checklist:', checklist)

    const [currTodos, setCurrTodos] = useState(todos)
    console.log('currTodos:', currTodos)

    function onChangeTodoDone(ev, todo) {
        todo.isDone = !todo.isDone
        updateTodo(ev, todo)
    }

    function updateTodo(ev, todo) {
        let index = currTodos.findIndex(cl => (cl.id === todo.id))
        let updateTodo = currTodos[index]
        currTodos.splice(index, 1, updateTodo)
        onSaveEdit(ev)
    }


    return <Fragment>
        {todos.map(todo => {
            return <li key={todo.id} className="task-checklist-todo">
                <input
                    onChange={(ev) => { onChangeTodoDone(ev, todo) }}
                    checked={todo.isDone}
                    className="task-checklist-checkbox"
                    type="checkbox"
                    id={todo.id}
                />
                <label className="task-checklist-label">
                    {todo.title}
                </label>
            </li>

        })}

    </Fragment>
}