import { Fragment, useState } from 'react'

export function TaskChecklistList({ todos, checklist, onSaveEdit }) {
    console.log('todos:', todos)
    console.log('checklist:', checklist)

    const [currTodos, setTodos] = useState(todos)
    console.log('todos:', todos)

    function onChangeTodoDone(ev, todo) {
        console.log('todo:', todo)

        todo.isDone = !todo.isDone
        console.log('aftr todo:', todo)
        console.log('todos:', todos)

        updateTodo(todo)
    }

    function updateTodo(todo) {
        console.log(' updateTodo todo:', todo)
        let index = currTodos.findIndex(cl => (cl.id === todo.id))
        let updateTodo = currTodos[index]
        setTodos(currTodos.splice(index, 1, updateTodo))
        onSaveUpdateTodo()

    }

    function onSaveUpdateTodo() {
        // let index = checklists.findIndex(cl => (cl.id === checklist_id))
        // let currChecklist = checklists[index]
        // currChecklist.title = currTitle
        // checklists.splice(index, 1, currChecklist)
        // onCloseTitleInput()
        // onSaveEdit(ev)
    }


    // console.log('todos:', todos)

    return <Fragment>

        {todos.map(todo => {
            // { console.log('todo:', todo) }

            return <li key={todo.id} className="task-checklist-todo">

                <input
                    onChange={(ev) => { onChangeTodoDone(ev, todo) }}
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