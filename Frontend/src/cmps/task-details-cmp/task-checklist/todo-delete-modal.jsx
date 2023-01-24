import { IoClose } from 'react-icons/io5'

export function TodoDeleteModal({ toggleModalDelete, todoId, onRemoveTodo, type }) {
    console.log('hello:')

    return (
        <section className="group-dropdown">
            <div className="group-dropdown-container">
                <div className="group-dropdown-header">
                    <span>Delete {type}?</span>
                    <button
                        className="btn-group-dropdown close"
                        onClick={(event) => toggleModalDelete(event, todoId)}
                    >
                        <IoClose className="icon-close" />
                    </button>
                </div>

                <p>Deleting a {type} is permanent and there is no way to get it back.</p>
                <button className='clean-btn btn-remove-side-bar' onClick={(ev) => onRemoveTodo(ev, todoId)}>Delete {type}</button>
                {/* <ul className="group-dropdown-actions clean-list">
					<li onClick={() => onCopyGroup(group)}>Copy list</li>
					<li onClick={() => onRemoveGroup(group.id)}>Delete list</li>
				</ul> */}
            </div>
        </section>

    )

}