import { useState } from 'react';
import { BsArchive, BsPerson, BsTag, BsCheck2Square } from "react-icons/bs";
import { TaskChecklistList } from './task-checklist-list';

export function TaskChecklistPreview({ handleChange, onSaveEdit, task }) {
    // console.log('task:', task)
    const [isEditTitleOpen, setIsEditTitleOpen] = useState(false)
    const [checklistId, setChecklistId] = useState('')

    const { checklists } = task
    // console.log('checklists:', checklists)

    function onDeleteChecklist(id) {
        console.log('delete checklist', id)
    }

    function onChangeTodoDone(todo) {
        todo.isDone = !todo.isDone
    }

    function onShowTitleInput(id) {
        setChecklistId(id)
        setIsEditTitleOpen(true)
    }

    function onCloseTitleInput() {
        setChecklistId('')
        setIsEditTitleOpen(false)
    }
    function onSaveChecklistTitle() {
        onCloseTitleInput()
    }

    return <section className='task-checklists-preview-section'>
        {checklists.map(checklist => {
            return <div className='task-checklists-preview-container' key={checklist.id}>
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
                            <form onSubmit={onSaveChecklistTitle}>
                                <input autoFocus
                                    name="checklist-title"
                                    className='task-checklist-title-input'
                                    id="checklist-title"
                                    onChange={handleChange}
                                    defaultValue={checklist.title}
                                ></input>
                                <div className='task-description-btn'>
                                    <button className='clean-btn btn-task-details btn-description-save' >
                                        Save
                                    </button>
                                    <button className='clean-btn btn-description-cancel btn-task-details btn-description-cancel'
                                        onClick={() => { onCloseTitleInput() }}>
                                        Cancel
                                    </button>
                                </div>
                            </form >
                        }

                    </div>

                    {!isEditTitleOpen && <div className='btn-checklist-delete-container'>
                        <button className='clean-btn btn-task-details btn-checklist-delete' onClick={() => onDeleteChecklist(checklist.id)}>Delete</button>
                    </div>}
                </div>
                <hr />
                <ul className='clean-list'>
                    {
                        checklist.todos && checklist.todos.length > 0 &&
                        < TaskChecklistList
                            todos={checklist.todos}
                            onChangeTodoDone={onChangeTodoDone}
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