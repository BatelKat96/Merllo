import { useState } from 'react';
import { IoClose } from 'react-icons/io5'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { ItemDeleteModal } from '../dynamic-delete-modal';
export function EditLabelTitle({ label, onOpenAddLabelModal, onSaveLabel, onRemoveLabel }) {
    console.log('label:', label)
    const [currLabel, setCurrLabel] = useState(label)
    const [isDeleteModalOpen, setDeleteModalOpen] = useState({ labelId: '' })
    // console.log('onRemoveLabel:', onRemoveLabel)


    const labelColors = [
        '#7BC86C',
        '#F5DD29',
        '#FFAF3F',
        '#EF7564',
        '#CD8DE5',
        '#5BA4CF',
        '#29CCE5',
        '#6DECA9',
        '#FF8ED4',
        '#172B4D'
    ]

    function handleChange({ target }) {
        console.log(':')
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setCurrLabel((prevLabel) => ({ ...prevLabel, [field]: value }))
    }


    function setLabelCover(color) {
        console.log('color:', color)

        currLabel.color = color
        console.log('currLabel:', currLabel)
    }

    function toggleModalDelete(ev, id) {
        ev.stopPropagation()
        ev.preventDefault()
        if (isDeleteModalOpen.labelId === id) {
            setDeleteModalOpen({ labelId: '' })
        } else {
            setDeleteModalOpen({ 'labelId': id })
        }
    }





    return (<>
        <button
            className="clean-btn btn-item-modal btn-edit-label-modal-back-container"
            onClick={(ev) => onOpenAddLabelModal(ev)}
        >
            <MdKeyboardArrowLeft className='btn-edit-label-modal-back' />
        </button>
        <section className="edit-label-modal">

            <h3 className='small-headline cmp-dynamoic-options-title edit-label-modal-mini-title '>Title</h3>
            <input
                type="text"
                className='cmp-dynamoic-input'
                name="title"
                id="txt"
                onChange={handleChange}
                defaultValue={(label.title)}
                autoFocus
                autoComplete="off"
                required
            />

            <div className='colors'>
                <h3 className='small-headline cmp-dynamoic-options-title  '>Select color</h3>

                <div className='color-wrapper clean-list'>
                    {labelColors.map((labelColor) => (
                        <li key={labelColor} className={labelColor}>
                            <button
                                className='color-btn'
                                onClick={() => setLabelCover(labelColor)}
                                style={{ backgroundColor: `${labelColor} ` }}
                            >
                            </button>
                        </li>
                    ))}
                </div>
            </div>

            <div className='btn-edit-label-modal'>

                <button className='clean-btn btn-task-details btn-update-label'
                    onClick={(ev) => { onSaveLabel(ev, currLabel) }}>
                    Save
                </button>
                {currLabel.id && <button className='clean-btn btn-task-details btn-remove-label'
                    onClick={(ev) => toggleModalDelete(ev, currLabel.id)} >
                    Delete
                </button>}

            </div>
            {isDeleteModalOpen.labelId === label.id && currLabel.id && (
                <ItemDeleteModal
                    toggleModalDelete={toggleModalDelete}
                    itemId={label.id}
                    onRemoveItem={onRemoveLabel}
                    type={'label'}
                />
            )}
        </section >

    </>
    )
}

