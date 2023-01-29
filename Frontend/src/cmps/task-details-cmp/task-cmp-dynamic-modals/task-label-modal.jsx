import { useState } from 'react'
import { useSelector } from 'react-redux'
import { boardService } from '../../../services/board.service'
import { utilService } from '../../../services/util.service'
import { updateBoard } from '../../../store/board.actions'
import { EditLabelTitle } from './task-edit-label-modal'

import { RxPencil1 } from "react-icons/rx";



export function TaskLabelModal({ task, data, onSaveTask, setIsAddLabelModalOpen, isAddLabelModalOpen, setSelectedLabel, selectedLabel }) {
    const board = useSelector((storeState) => storeState.boardModule.board)

    const { labels } = board
    const { labelIds } = task
    console.log('labels:', labels)


    const [toRender, setToRender] = useState(labels)

    async function onToggleLabel(ev, id) {
        let updateLabelIds
        let updateTask

        if (labelIds?.includes(id)) {

            updateLabelIds = labelIds.filter(label => (label !== id))
            updateTask = { ...task, labelIds: updateLabelIds }
        } else {
            updateLabelIds = labelIds
            updateLabelIds.push(id)
            updateTask = { ...task, labelIds: updateLabelIds }
        }
        onSaveTask(ev, updateTask)
    }

    function handleChange({ target }) {
        const regex = new RegExp(target.value, 'i')
        const filteredLabels = labels.filter((label) => regex.test(label.title))
        setToRender(filteredLabels)
    }

    function onOpenAddLabelModal(ev, label) {
        ev.stopPropagation()
        ev.preventDefault()
        if (!label) label = boardService.getEmptyLabel()
        setIsAddLabelModalOpen(!isAddLabelModalOpen)
        setSelectedLabel(label)
    }

    async function onSaveLabel(ev, label) {
        if (!label.title) return
        console.log('label be:', label)

        if (!label.color) label.color = '#F5DD29'
        console.log('label af: ', label)

        let updateLabelIds
        let updateLabelsBoard
        let updateTask
        let currUpdateBoard = { ...board }
        if (!task.labelIds) task.labelIds = []

        if (label.id) {


            //board
            updateLabelsBoard = labels
            let index = updateLabelsBoard.findIndex(lbl => (lbl.id === label.id))
            updateLabelsBoard.splice(index, 1, label)

            currUpdateBoard.labels = updateLabelsBoard

            //task
            updateLabelIds = labelIds
            let indexInTask = updateLabelIds.findIndex(lbl => (lbl.id === label.id))
            updateLabelIds.splice(indexInTask, 1, label.id)
            updateTask = { ...task, labelIds: updateLabelIds }
        } else {
            label.id = utilService.makeId()

            //board
            updateLabelsBoard = labels
            updateLabelsBoard.push(label)
            currUpdateBoard.labels = updateLabelsBoard

            //task
            updateLabelIds = labelIds
            updateLabelIds.push(label.id)
            updateTask = { ...task, labelIds: updateLabelIds }
        }

        try {
            onOpenAddLabelModal(ev)
            setToRender(updateLabelsBoard)
            await updateBoard(currUpdateBoard)
            onSaveTask(ev, updateTask)
        } catch (err) {
            console.log('Cant save label:', err)
        }
    }




    async function onRemoveLabel(ev, id) {
        console.log('label:', id)
        let currUpdateBoard = { ...board }
        let updateLabelsBoard = labels.filter(cl => (cl.id !== id))
        currUpdateBoard.labels = updateLabelsBoard
        try {
            onOpenAddLabelModal(ev)
            setToRender(updateLabelsBoard)
            await updateBoard(currUpdateBoard)
            // onSaveTask(ev, updateTask)
        } catch (err) {
            console.log('Cant save label:', err)
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
                        <button className='clean-btn btn-edit-label' onClick={(ev) => { onOpenAddLabelModal(ev, opt) }}>
                            <RxPencil1 />
                        </button>
                    </li>

                )}
                {!toRender.length && <li className="cmp-dynamoic-option">No label by this name</li>}

            </ul>
            <button className='clean-btn btn-task-details btn-create-label' onClick={(ev) => { onOpenAddLabelModal(ev) }}>
                Create a new label
            </button>
        </section>}

        {isAddLabelModalOpen && <div className='edit-label-modal'>
            <EditLabelTitle label={selectedLabel} onOpenAddLabelModal={onOpenAddLabelModal} onSaveLabel={onSaveLabel} onRemoveLabel={onRemoveLabel} />

        </div>}
    </>

}

