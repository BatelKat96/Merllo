import { IoClose } from 'react-icons/io5'

export function TodoDeleteModal({ toggleModalDelete, todoId, onRemoveTodo, type }) {
    console.log('hello:')

    return (
        <section className="todo-modal">
            <div className="todo-modal-container">
                <div className="todo-modal-header">
                    <span>Delete {type}?</span>
                    <button
                        className="btn-todo-modal close"
                        onClick={(event) => toggleModalDelete(event, todoId)}
                    >
                        <IoClose className="icon-close" />
                    </button>
                </div>

                <p>Deleting a {type} is permanent and there is no way to get it back.</p>
                <button className='clean-btn btn-task-details btn-side-bar btn-remove-todo-modal' onClick={(ev) => onRemoveTodo(ev, todoId)}>Delete {type}</button>

            </div>
        </section>

    )

}