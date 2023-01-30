import { useState } from 'react';

import { boardService } from '../../../services/board.service';

export function TaskChecklistModal({ task, onSaveTask, onClose }) {
    console.log('task:', task)

    const { checklists } = task

    const [titleToAdd, setTitleToAdd] = useState('')

    function handleChange({ target }) {
        let { value, type } = target
        value = type === 'number' ? +value : value
        setTitleToAdd(value)
    }

    function addChecklist(ev, newTitle) {
        ev.stopPropagation()
        ev.preventDefault()
        let updateChecklists = checklists
        let newChecklist = boardService.getEmptyChecklist()
        newChecklist.title = newTitle
        updateChecklists.push(newChecklist)
        const newTask = { ...task, checklists: updateChecklists }
        onSaveTask(ev, newTask)
        onClose()
    }

    return <section className='task-checklist-modal-section'>

        <h3 className='small-headline cmp-dynamic-options-title add-checklist-title'>Title</h3>
        <input
            type="text"
            className='cmp-dynamic-input add-checklist-input'
            name="title"
            id="txt"
            onChange={handleChange}
            defaultValue={titleToAdd}
            autoFocus
            autoComplete="off"
        />

        <button className='clean-btn btn-task-details btn-add-checklist'
            onClick={(ev) => { addChecklist(ev, titleToAdd) }}>
            Add
        </button>
    </section>
}