import { Fragment, useState } from 'react'
import { TodoPreview } from './task-checklist-todo-preview'

export function TaskChecklistList({ todos, checklist, onSaveEdit }) {
    const [currTodos, setCurrTodos] = useState(todos)

    function onChangeTodoDone(ev, todo) {
        todo.isDone = !todo.isDone
        updateTodo(ev, todo)
    }

    function updateTodo(ev, todo) {
        let index = currTodos.findIndex(cl => (cl.id === todo.id))
        let updateTodo = currTodos[index]
        let newTodos = currTodos.splice(index, 1, updateTodo)
        setCurrTodos(newTodos)
        onSaveEdit(ev)
    }

    function onRemoveTodo(ev, id) {
        ev.stopPropagation()
        ev.preventDefault()
        let index = currTodos.findIndex(cl => (cl.id === id))
        let newTodos = currTodos.splice(index, 1)
        setCurrTodos(newTodos)

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
                {/* <label className="task-checklist-label"> */}
                <TodoPreview todo={todo} updateTodo={updateTodo} onRemoveTodo={onRemoveTodo} />

                {/* </label> */}
            </li>

        })}

    </Fragment>
}