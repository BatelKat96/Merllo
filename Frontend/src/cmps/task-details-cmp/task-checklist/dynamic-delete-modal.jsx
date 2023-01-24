import { IoClose } from 'react-icons/io5'

export function ItemDeleteModal({ toggleModalDelete, itemId, onRemoveItem, type }) {
    // console.log('hello:')

    return (
        <section className="item-modal">
            <div className="item-modal-container">
                <div className="item-modal-header">
                    <span>Delete {type}?</span>
                    <button
                        className="btn-item-modal close"
                        onClick={(event) => toggleModalDelete(event, itemId)}
                    >
                        <IoClose className="icon-close" />
                    </button>
                </div>

                <p>Deleting a {type} is permanent and there is no way to get it back.</p>
                <button className='clean-btn btn-task-details btn-side-bar btn-remove-item-modal' onClick={(ev) => onRemoveItem(ev, itemId)}>Delete {type}</button>

            </div>
        </section>

    )

}