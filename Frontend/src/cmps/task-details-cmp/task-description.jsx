import { useState } from 'react'
import description from '../../assets/img/icons-task-details/description.svg'


export function TaskDescription({ handleChange, onSaveEdit, task }) {

    const [isEditDescOpen, setIsEditDescOpen] = useState(false)

    function openEditDesc() {
        setIsEditDescOpen(true)
    }
    function closeEditDesc() {
        setIsEditDescOpen(false)
    }

    async function onSaveDesc(ev) {
        // ev.preventDefault()
        try {
            await onSaveEdit(ev)
            closeEditDesc()
        } catch (err) {
            console.log('Failed to save task description', err)
        }
    }


    return <div className='task-description-container'>
        <img className='icon-task description-icon' src={description} />
        <div>

            <h3 className='medium-headline task-description-title'>Description</h3>

            {!isEditDescOpen && <div className='btn-description-edit-container'>
                <button className='clean-btn btn-task-details btn-description-edit' onClick={() => openEditDesc()}>Edit</button>
            </div>}
        </div>

        {!isEditDescOpen && task.description && < p className='task-description-p' onClick={() => openEditDesc()}>{task.description}</p>
        }
        {!isEditDescOpen && !task.description && <p className='task-description-placeholder' onClick={() => openEditDesc()}>Add a more detailed description...</p>}

        {isEditDescOpen &&
            <form onSubmit={onSaveDesc}>
                <textarea autoFocus
                    name="description"
                    className='task-description-textarea'
                    id="description"
                    onChange={handleChange}
                    defaultValue={task.description}
                    placeholder="Add a more detailed description..."
                ></textarea>
                <div className='task-description-btn'>
                    <button className='clean-btn btn-task-details btn-description-save' >Save</button>
                    <button className='clean-btn btn-description-cancel btn-task-details btn-description-cancel' onClick={() => closeEditDesc()}>Cancel</button>
                </div>


            </form >
        }

    </div >
}
