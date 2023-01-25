import { useState } from 'react';
import { boardService } from '../../../services/board.service';

import { BsCheck2Square } from "react-icons/bs";
import { TaskChecklistList } from './task-checklist-list';
import { GrClose } from "react-icons/gr";
import { ItemDeleteModal } from '../dynamic-delete-modal';




export function TaskChecklistPreview({ onSaveEdit, task, onSaveTask }) {
    const { checklists } = task
    const [isEditTitleOpen, setIsEditTitleOpen] = useState(false)
    const [isDeleteModalOpen, setDeleteModalOpen] = useState({ checklistId: '' })
    const [currChecklistId, setCurrChecklistId] = useState('')
    const [titleToEdit, setTitleToEdit] = useState('')
    const [isAddTitleOpen, setIsAddTitleOpen] = useState(false)
    // const [isAddTitleOpen, setIsAddTitleOpen] = useState(false)




    function toggleDeleteChecklist(ev, id) {
        ev.stopPropagation()
        ev.preventDefault()
        if (isDeleteModalOpen.checklistId === id) {
            setDeleteModalOpen({ checklistId: '' })
        } else {
            setDeleteModalOpen({ 'checklistId': id })
        }
    }

    function onRemoveChecklist(ev, checklist_id) {
        const newChecklists = checklists.filter(cl => (cl.id !== checklist_id))
        const newTask = { ...task, checklists: newChecklists }
        onSaveTask(ev, newTask)
    }

    function onShowTitleInput(id) {
        setCurrChecklistId(id)
        setIsEditTitleOpen(true)
    }

    function onCloseTitleInput() {
        setCurrChecklistId('')
        setIsEditTitleOpen(false)
    }

    function handleChange({ target }) {
        let { value, type, name: field, defaultValue } = target
        console.log('value:', value)

        value = type === 'number' ? +value : value
        // currTitle = value ? value : defaultValue
        setTitleToEdit(value)
    }

    function onSaveChecklistTitle(ev, checklist_id) {
        let updateChecklists

        ev.stopPropagation()
        ev.preventDefault()
        if (currChecklistId === checklist_id) {

            updateChecklists = checklists
            let index = updateChecklists.findIndex(cl => (cl.id === checklist_id))

            let currChecklist = updateChecklists[index]
            currChecklist.title = titleToEdit ? titleToEdit : currChecklist.title
            updateChecklists.splice(index, 1, currChecklist)

            onCloseTitleInput()
            setCurrChecklistId('')

            const newTask = { ...task, checklists: updateChecklists }
            onSaveTask(ev, newTask)
        }
    }


    function updateChecklists(ev, checklist) {
        console.log('in update checklists:', checklist)

        let updateChecklists = checklists

        let index = updateChecklists.findIndex(cl => (cl.id === checklist.id))
        // let currChecklist = updateChecklists[index]
        updateChecklists.splice(index, 1, checklist)
        console.log('updateChecklists after remove:', updateChecklists)

        setCurrChecklistId('')
        const newTask = { ...task, checklists: updateChecklists }
        console.log('newTask:', newTask)

        onSaveTask(ev, newTask)
    }


    function onAddTodoInputOpen(id) {
        console.log('id:', id)

        setIsAddTitleOpen(true)
        console.log('currChecklistId bf:', currChecklistId)
        setCurrChecklistId(id)
        console.log('currChecklistId af:', currChecklistId)

    }
    function onAddTodoInputClose() {
        setIsAddTitleOpen(false)
        setCurrChecklistId('')
    }

    function addTodo(ev, newTodoTitle, checklist) {
        ev.stopPropagation()
        ev.preventDefault()

        let updateTodos = checklist.todos
        let updateChecklist = { ...checklist }
        let newTodo = boardService.getEmptyTodo()
        newTodo.title = newTodoTitle
        updateTodos.push(newTodo)
        updateChecklist.todos = updateTodos
        updateChecklists(ev, updateChecklist)
        setTitleToEdit('')
        onAddTodoInputClose()
    }

    return <section className='task-checklists-preview-section'>
        {checklists.map(checklist => {
            return <div className='task-checklists-preview-container' key={checklist.id} >

                <div className='task-checklist-preview-header'>
                    <div className='checklists-icon-container'>
                        <BsCheck2Square className='icon-task checklists-icon' />
                    </div>

                    <div className='task-checklist-preview-title-container'>
                        {(!isEditTitleOpen || (currChecklistId !== checklist.id)) &&
                            <h3 className='medium-headline task-checklist-title'
                                onClick={() => { onShowTitleInput(checklist.id) }}>
                                {checklist.title}
                            </h3>
                        }
                        {isEditTitleOpen && (currChecklistId === checklist.id) &&
                            <form>
                                <textarea
                                    // onBlur={onCloseTitleInput}
                                    autoFocus
                                    name='title'
                                    className='task-checklist-title-input medium-headline'
                                    id={checklist.id}
                                    onChange={handleChange}
                                    defaultValue={checklist.title}
                                ></textarea>

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

                        {isDeleteModalOpen.checklistId === checklist.id && (
                            <ItemDeleteModal
                                toggleModalDelete={toggleDeleteChecklist}
                                itemId={checklist.id}
                                onRemoveItem={onRemoveChecklist}
                                type={'checklist'}
                            />
                        )}
                    </div>

                    {(!isEditTitleOpen || (currChecklistId !== checklist.id)) && <div className='btn-checklist-delete-container'>
                        <button
                            className='clean-btn btn-task-details btn-checklist-delete'
                            onClick={(ev) => toggleDeleteChecklist(ev, checklist.id)}>
                            Delete
                        </button>
                    </div>}
                </div>
                <hr />
                <ul className='clean-list'>
                    {checklist.todos && checklist.todos.length > 0 &&
                        < TaskChecklistList
                            todos={checklist.todos}
                            checklist={checklist}
                            updateChecklists={updateChecklists}
                        />
                    }
                </ul>


                <div className='task-add-todo-container' >
                    {(!isAddTitleOpen || (currChecklistId !== checklist.id)) && <button className='clean-btn btn-task-details btn-add-todo'
                        onClick={() => { onAddTodoInputOpen(checklist.id) }}>
                        Add an item
                    </button>}

                    {(isAddTitleOpen && (currChecklistId === checklist.id)) && <form>
                        <textarea
                            autoFocus
                            name='add-todo'
                            className='task-add-todo-input'
                            id={checklist.id}
                            placeholder='Add an item'
                            onChange={handleChange}
                            defaultValue={titleToEdit}
                        ></textarea>

                        <div className='task-checklist-btn'>
                            <button className='clean-btn btn-task-details btn-checklist-save'
                                type="submit" onClick={(ev) => addTodo(ev, titleToEdit, checklist)}>
                                Add
                            </button>
                            <button className='clean-btn btn-description-cancel btn-task-details btn-description-cancel'
                                onClick={onAddTodoInputClose}>
                                Cancel
                            </button>
                        </div>
                    </form >

                    }

                </div>

            </div>
        })
        }

    </section >

}

