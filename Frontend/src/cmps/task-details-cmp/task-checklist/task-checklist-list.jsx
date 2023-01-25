import { Fragment, useState } from 'react'

import { TodoPreview } from './task-checklist-todo-preview'

export function TaskChecklistList({ todos, checklist, updateChecklists }) {

    function onChangeTodoDone(ev, todo) {
        todo.isDone = !todo.isDone
        updateTodo(ev, todo)
    }

    function updateTodo(ev, todo) {
        let updateTodos = todos
        let updateChecklist = { ...checklist }
        const index = updateTodos.findIndex(cl => (cl.id === todo.id))
        const updateTodo = updateTodos[index]
        updateTodos.splice(index, 1, updateTodo)
        updateChecklist.todos = updateTodos
        updateChecklists(ev, updateChecklist)
    }

    function onRemoveTodo(ev, todoId) {
        ev.stopPropagation()
        ev.preventDefault()

        let updateChecklist = { ...checklist }
        const updateTodos = todos.filter(cl => (cl.id !== todoId))
        updateChecklist.todos = updateTodos
        updateChecklists(ev, updateChecklist)
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
                <TodoPreview todo={todo} updateTodo={updateTodo} onRemoveTodo={onRemoveTodo} />
            </li>

        })}


    </Fragment>
}