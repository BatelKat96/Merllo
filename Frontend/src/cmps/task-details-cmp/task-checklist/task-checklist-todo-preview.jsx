import { Fragment, useState } from 'react'
import { GrClose } from "react-icons/gr"
import { HiDotsHorizontal } from 'react-icons/hi'


export function TodoPreview({ todo, updateTodo }) {
    const [isEditTodoOpen, setIsEditTodoOpen] = useState(false)
    const [todoId, setTodoId] = useState('')
    const [currTodo, setCurrTodo] = useState(todo)
    let currTitle

    function onShowTodoInput(id) {

        setTodoId(id)
        setIsEditTodoOpen(true)
    }

    function onCloseTodoInput(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        setTodoId('')
        setIsEditTodoOpen(false)
    }
    function handleChange({ target }) {

        let { value, type, name: field, id, defaultValue } = target
        console.log('value:', value)
        console.log('field:', field)

        console.log('defaultValue:', defaultValue)
        value = type === 'number' ? +value : value
        currTitle = value ? value : defaultValue
        console.log('currTitle:', currTitle)

    }

    function onSaveTodoTitle(ev, id) {
        console.log('id:', id)
        ev.stopPropagation()
        ev.preventDefault()
        if (todoId === id) {
            currTodo.title = currTitle
            console.log('currTodo after:', currTodo)

            onCloseTodoInput(ev)
            updateTodo(ev, currTodo)
        }
    }

    function onOpenModalDelete() {

    }

    return (
        // <Fragment>
        <label className="task-checklist-label" onClick={() => { onShowTodoInput(todo.id) }}>

            {/* onClick={() => { onShowTodoInput(todo.id) }} */}
            {(!isEditTodoOpen || (todoId !== todo.id)) &&
                <span className='task-checklist-label-span'
                >
                    {todo.title}


                </span>}
            {!isEditTodoOpen &&
                <button className='clean-btn btn-checklist-label-menu-container '>
                    <HiDotsHorizontal className='btn-checklist-label-menu' />
                </button>
            }
            {(isEditTodoOpen || (todoId == todo.id)) &&
                < form  >
                    <input

                        // onBlur={onCloseTitleInput}
                        autoFocus
                        name='title'
                        className='task-todo-title-input'
                        id={todo.id}
                        onChange={handleChange}
                        defaultValue={todo.title}
                    ></input>

                    <div className='task-checklist-btn'>
                        <button className='clean-btn btn-task-details btn-checklist-save'
                            type="submit" onClick={(ev) => onSaveTodoTitle(ev, (todo.id))}>
                            Save
                        </button>
                        <button className='clean-btn icon-task btn-checklist-cancel-container'
                            onClick={(ev) => onCloseTodoInput(ev)}
                            style={{ textDecoration: 'none' }}>

                            <GrClose className='btn-checklist-cancel' />
                        </button>
                    </div>
                </form >}

        </label>
        // </Fragment>
    )

}