import { useState } from 'react'
import { useSelector } from 'react-redux'

import { TaskCoverModal } from './task-cmp-dynamic-modals/task-cover-modal'

import { IoClose } from "react-icons/io5"
import { BiCheck } from 'react-icons/bi'
import Loader from '../../assets/img/loader.svg'
import { saveTask } from '../../store/board.actions'
import { TaskList } from '../task-preview/task-list'
import { TaskLabelModal } from './task-cmp-dynamic-modals/task-label-modal'
import { TaskMemberModal } from './task-cmp-dynamic-modals/task-member-modal'

export function TaskCmpDynamoic({ cmpType, task, onOpenModal, boardId, groupId, refDataBtn, onSaveTask }) {

    const board = useSelector((storeState) => storeState.boardModule.board)
    const members = board.members
    const labels = board.labels

    const [updateTask, setUpdateTask] = useState(task)
    const [toRender, setToRender] = useState(members)
    // const [toRender, setToRender] = useState(labels)

    const modalPos = {
        top: refDataBtn.current.offsetTop + "px",
        left: refDataBtn.current.offsetLeft + "px"
    }

    const { labelIds } = updateTask


    function onClose() {
        onOpenModal()
    }

    let data = {
        title: cmpType,
        txt: '',
        placeholder: `Search ${cmpType}`,
        optionsTitle: `Board ${cmpType}`

    }


    async function onToggleLabel(id) {
        if (labelIds?.includes(id)) {
            const index = labelIds.indexOf(id)
            labelIds.splice(index, 1)
        }
        else {
            if (labelIds) labelIds.push(id)
            else labelIds = [id]
        }
        setUpdateTask((prevTask) => ({ ...prevTask }))
        await saveTask(updateTask, groupId, boardId)
    }

    function handleChange({ target }) {
        const regex = new RegExp(target.value, 'i')
        const filteredMembers = members.filter((member) => regex.test(member.fullname))
        console.log('filteredMembers:', filteredMembers)

        setToRender(filteredMembers)
    }


    if (!board) return <div className="loader-wrapper"><img className="loader" src={Loader} alt="loader" /></div>

    return <div className='task-cmp-dynamoic' style={modalPos}>
        <div className='task-cmp-dynamoic-container'>
            <a onClick={onClose}><IoClose className='close-icon' /></a>
            <p className='cmp-dynamoic-title'>{data.title}</p>
            <div className='dynamic-container'>
                {/* <input
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
                <h3 className='small-headline cmp-dynamoic-options-title'>{data.optionsTitle}</h3> */}


                {cmpType === 'members' &&
                    <TaskMemberModal
                        task={task}
                        data={data}
                        onSaveTask={onSaveTask}
                    />}

                {cmpType === 'labels' &&
                    <TaskLabelModal
                        task={task}
                        data={data}
                        onSaveTask={onSaveTask}
                    />}

                {/* side-bar-label-cmp-dynamoic */}
                {/* {cmpType === 'labels' && <ul className='cmp-dynamoic-options-list clean-list'>
                    {info.map(opt =>
                        <label htmlFor={opt.id} className="cmp-dynamoic-labels-label">
                        <input 
                       onChange={(ev) => {handleChange(ev, opt.id)}}
                       checked={labelIds?.includes(opt.id)}
                    className="checkbox"
                    type="checkbox"
                    id={opt.id}
                        />
                    <li key={opt.id} className="cmp-dynamoic-option cmp-dynamoic-option-labels" style={{ backgroundColor: `${opt.color}38` }}> onClick={() => onToggleLabel(opt.id)}*/}
                {/* <span className='color-circle' style={{ backgroundColor: `${opt.color}` }}></span>
                            <p>{opt.title}</p>
                            </li>
                            </label>
                    )}
                </ul>} */}

                {/* <ul className='cmp-dynamoic-options-list clean-list'>
                    {data.options.map(opt =>
                        <li key={opt} className="cmp-dynamoic-option">
                            {opt}
                        </li>
                    )}
                </ul> */}

                {cmpType === 'cover' &&
                    <TaskCoverModal
                        task={task}
                    />}

            </div>
        </div>
    </div>


}