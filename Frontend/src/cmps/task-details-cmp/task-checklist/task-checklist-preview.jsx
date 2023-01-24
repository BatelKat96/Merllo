import { useState } from 'react';
import { BsArchive, BsPerson, BsTag, BsCheck2Square } from "react-icons/bs";
import { TaskChecklistList } from './task-checklist-list';
import { IoCloseOutline } from "react-icons/io5";
import { GrClose } from "react-icons/gr";
import { IoClose } from "react-icons/io5";


export function TaskChecklistPreview({ onSaveEdit, task }) {
    // console.log('task:', task)
    const currChecklists = task.checklists
    const [isEditTitleOpen, setIsEditTitleOpen] = useState(false)
    const [checklists, setChecklists] = useState(currChecklists)
    const [checklistId, setChecklistId] = useState('')
    let currTitle

    // const { checklists } = task
    // setCurrChecklists(checklists)
    // console.log('checklists:', checklists)

    function onDeleteChecklist(ev, checklist_id) {
        console.log('delete checklist', checklist_id)
        let index = checklists.findIndex(cl => (cl.id === checklist_id))
        checklists.splice(index, 1)
        onSaveEdit(ev)
    }



    function onShowTitleInput(id) {
        setChecklistId(id)
        setIsEditTitleOpen(true)
    }

    function onCloseTitleInput() {
        setChecklistId('')
        setIsEditTitleOpen(false)
    }

    function handleChange({ target }) {

        let { value, type, name: field, id, defaultValue } = target
        console.log('defaultValue:', defaultValue)
        value = type === 'number' ? +value : value
        currTitle = value ? value : defaultValue
    }

    function onSaveChecklistTitle(ev, checklist_id) {
        console.log('ev:', ev)

        ev.stopPropagation()
        ev.preventDefault()
        if (checklistId === checklist_id) {
            let index = checklists.findIndex(cl => (cl.id === checklist_id))
            let currChecklist = checklists[index]
            // if (!currTitle) currTitle=
            currChecklist.title = currTitle ? currTitle : currChecklist.title
            checklists.splice(index, 1, currChecklist)
            onCloseTitleInput()
            setChecklistId('')
            onSaveEdit(ev)
        }
    }

    return <section className='task-checklists-preview-section'>
        {checklists.map(checklist => {
            return <div className='task-checklists-preview-container' key={checklist.id} >

                <div className='task-checklist-preview-header'>
                    <div className='checklists-icon-container'>
                        <BsCheck2Square className='icon-task checklists-icon' />
                    </div>

                    <div className='task-checklist-preview-title-container'>
                        {(!isEditTitleOpen || (checklistId !== checklist.id)) &&
                            <h3 className='medium-headline task-checklist-title'
                                onClick={() => { onShowTitleInput(checklist.id) }}>
                                {checklist.title}
                            </h3>
                        }
                        {isEditTitleOpen && (checklistId === checklist.id) &&
                            <form>
                                <input
                                    // onBlur={onCloseTitleInput}
                                    autoFocus
                                    name='title'
                                    className='task-checklist-title-input medium-headline'
                                    id={checklist.id}
                                    onChange={handleChange}
                                    defaultValue={checklist.title}
                                ></input>

                                <div className='task-checklist-btn'>
                                    <button className='clean-btn btn-task-details btn-checklist-save'
                                        type="submit" onClick={(ev) => onSaveChecklistTitle(ev, (checklist.id))}>
                                        Save
                                    </button>
                                    <button className='clean-btn icon-task btn-checklist-cancel-container'
                                        onClick={onCloseTitleInput}>
                                        <GrClose className='btn-checklist-cancel' />
                                    </button>
                                </div>
                            </form >
                        }

                    </div>

                    {(!isEditTitleOpen || (checklistId !== checklist.id)) && <div className='btn-checklist-delete-container'>
                        <button className='clean-btn btn-task-details btn-checklist-delete' onClick={(ev) => onDeleteChecklist(ev, checklist.id)}>Delete</button>
                    </div>}
                </div>
                <hr />
                <ul className='clean-list'>
                    {
                        checklist.todos && checklist.todos.length > 0 &&
                        < TaskChecklistList
                            todos={checklist.todos}
                            checklist={checklist}
                            onSaveEdit={onSaveEdit}
                        />
                    }
                </ul>

            </div>
        })
        }



    </section >

}

{/* <div className='task-one-checklist-preview-container'> */ }
{/* <div className='task-checklist-preview-header-icon-and-title'> */ }

// "checklists": [
//     {
//         "id": "cl102",
//         "title": "Checklist1",
//         "todos": [
//             {
//                 "id": "td104",
//                 "title": "item in checklist 1",
//                 "isDone": true
//             },
//             {
//                 "id": "td105",
//                 "title": "another item in checklist 1",
//                 "isDone": true
//             }
//         ]
//     },
//     {
//         "id": "cl103",
//         "title": "Checklist2",
//         "todos": [
//             {
//                 "id": "td104",
//                 "title": "item in checklist 2",
//                 "isDone": true
//             }
//         ]
//     }
// ]