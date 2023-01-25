import { useState } from 'react';
import { IoClose } from 'react-icons/io5'
import { MdKeyboardArrowLeft } from "react-icons/md";
export function EditLabelTitle({ label, onOpenAddLabelModal }) {
    console.log('label:', label)
    const [currLabel, setCurrLabel] = useState(label)

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



    return (
        <section className="edit-label-modal">

            <button
                className="clean-btn btn-item-modal btn-edit-label-modal-back-container"
                onClick={(ev) => onOpenAddLabelModal(ev)}
            >
                <MdKeyboardArrowLeft className='btn-edit-label-modal-back' />
            </button>
            <h3 className='small-headline cmp-dynamoic-options-title edit-label-modal-mini-title '>Title</h3>
            <input
                type="text"
                className='title-edit-label'
                name="title"
                id="txt"
                onChange={handleChange}
                defaultValue={(label.title)}
                autoFocus
                autoComplete="off"
            />

            <div className='colors'>
                <h3 className='small-headline cmp-dynamoic-options-title edit-label-modal-mini-title '>Select color</h3>

                <div className='color-wrapper clean-list'>
                    {labelColors.map((labelColor) => (
                        <li key={labelColor} className={labelColor}>
                            <button
                                className='color-btn'
                                // onClick={() => setTaskCover(coverColor, undefined)}
                                style={{ backgroundColor: `${labelColor} ` }}
                            >
                            </button>
                        </li>
                    ))}
                </div>
            </div>

        </section >

    )
}