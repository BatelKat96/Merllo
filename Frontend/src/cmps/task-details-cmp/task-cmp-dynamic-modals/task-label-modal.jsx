import { useState } from 'react'
import { useSelector } from 'react-redux'
import { boardService } from '../../../services/board.service'
import { EditLabelTitle } from './task-edit-label-modal'



export function TaskLabelModal({ task, data, onSaveTask, setIsAddLabelModalOpen, isAddLabelModalOpen, setSelectedLabel, selectedLabel }) {
    const board = useSelector((storeState) => storeState.boardModule.board)
    const labels = board.labels
    const labelIds = task.labelIds

    const [toRender, setToRender] = useState(labels)
    // const [isAddLabelModalOpen, setIsAddLabelModalOpen] = useState(false)
    // const [selectedLabel, setSelectedLabel] = useState('')

    async function onToggleLabel(ev, id) {
        let updateLabelIds
        let updateTask

        if (labelIds?.includes(id)) {
            updateLabelIds = labelIds.filter(label => (label !== id))
            updateTask = { ...task, labelIds: updateLabelIds }
        } else {
            if (labelIds) {
                updateLabelIds = labelIds
                updateLabelIds.push(id)
                updateTask = { ...task, labelIds: updateLabelIds }
            }
            else {
                updateTask = { ...task }
                updateTask.labelIds = [id]
            }
        }
        onSaveTask(ev, updateTask)
    }

    function handleChange({ target }) {
        const regex = new RegExp(target.value, 'i')
        const filteredLabels = labels.filter((label) => regex.test(label.title))
        console.log('filteredLabels:', filteredLabels)
        setToRender(filteredLabels)
    }

    function onOpenAddLabelModal(ev, label) {
        ev.stopPropagation()
        ev.preventDefault()
        if (!label) label = boardService.getEmptyLabel()
        console.log('label:', label)

        setIsAddLabelModalOpen(!isAddLabelModalOpen)
        setSelectedLabel(label)
    }

    function onSaveLabel(label) {
        let updateLabelIds
        let updateTask
        if (!board.labels) board.labels = []
        if (!task.labelIds) task.labelIds = []

        if (labelIds?.includes(label.id)) {
            updateLabelIds = { ...labelIds }
            updateLabelIds.splice(index, 1, label)
            let index = labelIds.findIndex(lbl => (lbl.id === label.id))
            updateTask = { ...task, labelIds: updateLabelIds }
        }

    }

    return <>
        {!isAddLabelModalOpen && <section>
            <input
                type="text"
                className='cmp-dynamoic-input'
                name="txt"
                id="txt"
                placeholder={data.placeholder}
                onChange={handleChange}
                defaultValue={data.txt}
                autoFocus
                autoComplete="off"
            />
            <h3 className='small-headline cmp-dynamoic-options-title'>{data.optionsTitle}</h3>
            <ul className='cmp-dynamoic-options-list clean-list' >
                {toRender && toRender.map(opt =>
                    <li key={opt.id} className="cmp-dynamoic-option cmp-dynamoic-option-labels"
                    >
                        <input
                            onChange={(ev) => { onToggleLabel(ev, opt.id) }}
                            checked={labelIds?.includes(opt.id)}
                            className="cmp-dynamoic-labels-checkbox"
                            type="checkbox"
                            id={opt.id}
                        />
                        <label htmlFor={opt.id} className="cmp-dynamoic-labels-label"
                            style={{ backgroundColor: `${opt.color}38` }}>
                            <span className='color-circle' style={{ backgroundColor: `${opt.color}` }}></span>
                            {opt.title}
                        </label>
                        <button className='clean-btn btn-task-details' onClick={(ev) => { onOpenAddLabelModal(ev, opt) }}>
                        </button>
                    </li>
                )}
                {!toRender.length && <li className="cmp-dynamoic-option">No label by this name</li>}


            </ul>
            <button className='clean-btn btn-task-details btn-create-label' onClick={(ev) => { onOpenAddLabelModal(ev) }}>
                Create A new label
            </button>
        </section>}

        {isAddLabelModalOpen && <div className='edit-label-modal'>
            <EditLabelTitle label={selectedLabel} onOpenAddLabelModal={onOpenAddLabelModal} />

        </div>}
    </>

}

