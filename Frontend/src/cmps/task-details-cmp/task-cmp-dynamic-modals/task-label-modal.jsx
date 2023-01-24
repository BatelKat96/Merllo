import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { saveTask } from '../../../store/board.actions'

export function TaskLabelModal({ task, data, onSaveTask }) {
    const board = useSelector((storeState) => storeState.boardModule.board)
    const labels = board.labels

    const { boardId, groupId, taskId } = useParams()
    const [updateTask, setUpdateTask] = useState(task)
    const [toRender, setToRender] = useState(labels)

    const { labelIds } = updateTask


    async function onToggleLabel(id) {
        console.log('id:', id)

        if (labelIds?.includes(id)) {
            const index = labelIds.indexOf(id)
            labelIds.splice(index, 1)
        }
        else {
            if (labelIds) labelIds.push(id)
            else labelIds = [id]
        }
        console.log('updateTask:', updateTask)

        setUpdateTask((prevTask) => ({ ...prevTask }))
        console.log('updateTask:', updateTask)
        onSaveTask(updateTask, groupId, boardId)
    }

    function handleChange({ target }) {
        const regex = new RegExp(target.value, 'i')
        const filteredLabels = labels.filter((label) => regex.test(label.title))
        console.log('filteredLabels:', filteredLabels)
        setToRender(filteredLabels)
    }


    return <>
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
                <label htmlFor={opt.id} className="cmp-dynamoic-labels-label">
                    <input
                        onChange={(ev) => { handleChange(ev, opt.id) }}
                        checked={labelIds?.includes(opt.id)}
                        className="checkbox"
                        type="checkbox"
                        id={opt.id}
                    />
                    <li key={opt.id}
                        className="cmp-dynamoic-option cmp-dynamoic-option-labels"
                        style={{ backgroundColor: `${opt.color}38` }}
                        onClick={() => onToggleLabel(opt.id)}>
                        <span className='color-circle' style={{ backgroundColor: `${opt.color}` }}></span>
                        <p>{opt.title}</p>
                    </li>
                </label>
            )}


            {!toRender.length && <li className="cmp-dynamoic-option">No member by this name</li>
            }
        </ul>
    </>


}



{/* 

{/* // <li key={opt._id} className="cmp-dynamoic-option" onClick={() => onToggleMember(opt._id)}> */}
                //     {/* <div onClick={() => onToggleMember(opt._id)}> */}

                //     <img className='cmp-dynamoic-member-img'
                //         src={require(`../../assets/img/members-task-details/${opt.imgUrl}`)}
                //         alt={opt.imgUrl} />
                //     <span>{opt.fullname}</span>
                //     {memberIds?.includes(opt._id) && (
                //         <span className="checked-icon">
                //             <BiCheck />
                //         </span>)}
                //     {/* </div> */}
                // </li> */}
