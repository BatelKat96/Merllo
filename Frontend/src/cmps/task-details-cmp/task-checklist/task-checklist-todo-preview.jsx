import { Fragment, useState } from 'react'
import { GrClose } from "react-icons/gr"
import { HiDotsHorizontal } from 'react-icons/hi'
import { TodoDeleteModal } from './todo-delete-modal'


export function TodoPreview({ todo, updateTodo }) {
    const [isEditTodoOpen, setIsEditTodoOpen] = useState(false)
    const [isDeleteModalOpen, setDeleteModalOpen] = useState({ todoId: '' })
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
        value = type === 'number' ? +value : value
        currTitle = value ? value : defaultValue
    }

    function onSaveTodoTitle(ev, id) {
        ev.stopPropagation()
        ev.preventDefault()
        if (todoId === id) {
            currTodo.title = currTitle
            onCloseTodoInput(ev)
            updateTodo(ev, currTodo)
        }
    }

    function toggleModalDelete(ev, id) {
        // console.log('id:', id)
        // console.log('isDeleteModalOpen.todoId:', isDeleteModalOpen.todoId)

        ev.stopPropagation()
        ev.preventDefault()
        if (isDeleteModalOpen.todoId === id) {
            setDeleteModalOpen({ todoId: '' })
            console.log('if isDeleteModalOpen:', isDeleteModalOpen)

        } else {
            setDeleteModalOpen({ 'todoId': id })
            console.log(' else isDeleteModalOpen:', isDeleteModalOpen)
        }
    }

    function onRemoveTodo(ev, id) {
        console.log('id:', id)
        ev.stopPropagation()
        ev.preventDefault()


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
                <button
                    className='clean-btn btn-checklist-label-menu-container'
                    onClick={(ev) => toggleModalDelete(ev, todo.id)}
                >
                    <HiDotsHorizontal className='btn-checklist-label-menu' />
                </button>
            }
            {isDeleteModalOpen.todoId === todo.id && (
                <TodoDeleteModal
                    toggleModalDelete={toggleModalDelete}
                    todoId={todo.id}
                    onRemoveTodo={onRemoveTodo}
                    type={'todo'}
                />
            )}

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