import { IoClose } from 'react-icons/io5'

export function EditLabelTitle({ label, onOpenAddLabelModal }) {
    console.log('label:', label)


    return (
        <section className="item-label-modal">
            <div className="item-modal-container">
                <div className="item-modal-header">
                    {label ? <span>Edit label</span> : <span>Create label</span>}
                    <button
                        className="btn-item-modal close"
                        onClick={(ev) => onOpenAddLabelModal(ev)}
                    >
                        <IoClose className="icon-close" />
                    </button>
                </div>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore ducimus facilis aut blanditiis fugit ad numquam officiis qui cum dignissimos, iure minima consequuntur. Illo odio aliquid repellat necessitatibus, ipsum sed!</p>
                {/* <p>Deleting a {type} is permanent and there is no way to get it back.</p>
                <button className='clean-btn btn-task-details btn-side-bar btn-remove-item-modal' onClick={(ev) => onRemoveItem(ev, itemId)}>Delete {type}</button> */}

            </div>
        </section >

    )
}