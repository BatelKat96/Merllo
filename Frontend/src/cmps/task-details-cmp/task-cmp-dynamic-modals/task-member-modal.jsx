import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { BiCheck } from 'react-icons/bi'

import { saveTask } from '../../../store/board.actions'
import { useSelector } from 'react-redux'

export function TaskMemberModal({ task, data, onSaveTask }) {
    console.log('task:', task)

    const board = useSelector((storeState) => storeState.boardModule.board)
    const members = board.members
    const memberIds = task.memberIds

    const { boardId, groupId, taskId } = useParams()
    // const [updateTask, setUpdateTask] = useState(task)
    const [toRender, setToRender] = useState(members)

    // console.log('updateTask:', updateTask)
    // const { memberIds } = updateTask


    async function onToggleMember(ev, id) {
        // console.log('id:', id)
        // console.log('memberIdsd:', memberIds)
        let updateMemberIds
        let updateTask

        if (memberIds?.includes(id)) {
            updateMemberIds = memberIds.filter(member => (member !== id))
            updateTask = { ...task, memberIds: updateMemberIds }
        } else {
            if (memberIds) {
                updateMemberIds = memberIds
                updateMemberIds.push(id)
                updateTask = { ...task, memberIds: updateMemberIds }
            }
            else {
                updateTask = { ...task }
                updateTask.memberIds = [id]
            }
        }
        onSaveTask(ev, updateTask)
    }

    function handleChange({ target }) {
        const regex = new RegExp(target.value, 'i')
        const filteredMembers = members.filter((member) => regex.test(member.fullname))
        console.log('filteredMembers:', filteredMembers)
        setToRender(filteredMembers)
    }

    return (<>
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
                <li key={opt._id} className="cmp-dynamoic-option" onClick={(ev) => onToggleMember(ev, opt._id)}>
                    <img className='cmp-dynamoic-member-img'
                        src={opt.imgUrl}
                        alt={opt.imgUrl} />
                    <span>{opt.fullname}</span>
                    {memberIds?.includes(opt._id) && (
                        <span className="checked-icon">
                            <BiCheck />
                        </span>)}
                </li>
            )}
            {!toRender.length && <li className="cmp-dynamoic-option">No member by this name</li>
            }
        </ul>
    </>
    )
}
