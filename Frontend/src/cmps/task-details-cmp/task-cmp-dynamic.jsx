import { useState } from 'react'
import { useSelector } from 'react-redux'

import { IoClose } from "react-icons/io5"
import { BiCheck } from 'react-icons/bi'
import Loader from '../../assets/img/loader.svg'
import { saveTask } from '../../store/board.actions'

export function TaskCmpDynamoic({ cmpType, task, onOpenModal, boardId, groupId, refDataBtn }) {

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

    // let info
    // DynamicCmp(cmpType)

    const { labelIds, memberIds } = task

    function DynamicCmp(cmpType) {
        switch (cmpType) {
            case 'members':
                setToRender(board.members)
                return toRender
            case 'labels':
            // setToRender(board.labels)
            // info = board.labels
            // return info
        }
    }



    function onClose() {
        onOpenModal()
    }

    let data = {
        title: cmpType,
        txt: '',
        placeholder: `Search ${cmpType}`,
        optionsTitle: `Board ${cmpType}`,
        options: toRender
    }



    async function onToggleMember(id) {
        if (memberIds?.includes(id)) {
            const index = memberIds.indexOf(id)
            memberIds.splice(index, 1)
        }
        else {
            if (memberIds) memberIds.push(id)
            else memberIds = [id]
        }
        setUpdateTask((prevTask) => ({ ...prevTask }))
        await saveTask(updateTask, groupId, boardId)
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


    if (!board) return <img className="loader" src={Loader} alt="loader" />
    return <div className='task-cmp-dynamoic' style={modalPos}>
        <div className='task-cmp-dynamoic-container'>
            <a onClick={onClose}><IoClose className='close-icon' /></a>
            <p className='cmp-dynamoic-title'>{data.title}</p>
            <div className='dynamic-container'>
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


                {/* side-bar-member-cmp-dynamoic */}
                {cmpType === 'members' && <ul className='cmp-dynamoic-options-list clean-list' >
                    {toRender && toRender.map(opt =>
                        <li key={opt._id} className="cmp-dynamoic-option" onClick={() => onToggleMember(opt._id)}>
                            {/* <div onClick={() => onToggleMember(opt._id)}> */}

                            <img className='cmp-dynamoic-member-img' src={require(`../../assets/img/members-task-details/${opt.imgUrl}`)} alt={opt.imgUrl} />
                            <span>{opt.fullname}</span>
                            {memberIds?.includes(opt._id) && (
                                <span className="checked-icon">
                                    <BiCheck />
                                </span>)}
                            {/* </div> */}
                        </li>
                    )}
                    {!toRender.length && <li className="cmp-dynamoic-option">No member by this name</li>
                    }
                </ul>}

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

            </div>
        </div>
    </div>


}