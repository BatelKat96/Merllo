import { useState } from 'react'
import { useSelector } from 'react-redux'

import { BiCheck } from 'react-icons/bi'

export function TaskMemberModal({ task, data, onSaveTask }) {

    const board = useSelector((storeState) => storeState.boardModule.board)
    const members = board.members
    const memberIds = task.memberIds

    const [toRender, setToRender] = useState(members)

    async function onToggleMember(ev, id) {
        let updateMemberIds
        let updateTask

        if (memberIds?.includes(id)) {
            updateMemberIds = memberIds.filter(member => (member !== id))
            updateTask = { ...task, memberIds: updateMemberIds }
        } else {
            updateMemberIds = memberIds
            updateMemberIds.push(id)
            updateTask = { ...task, memberIds: updateMemberIds }
        }
        onSaveTask(ev, updateTask)
    }

    function handleChange({ target }) {
        const regex = new RegExp(target.value, 'i')
        const filteredMembers = members.filter((member) => regex.test(member.fullname))
        // console.log('filteredMembers:', filteredMembers)
        setToRender(filteredMembers)
    }

    return (<>
        <input
            type="text"
            className='cmp-dynamic-input'
            name="txt"
            id="txt"
            placeholder={data.placeholder}
            onChange={handleChange}
            defaultValue={data.txt}
            autoFocus
            autoComplete="off"
        />
        <h3 className='small-headline cmp-dynamic-options-title'>{data.optionsTitle}</h3>
        <ul className=' clean-list cmp-dynamic-options-list' >
            {toRender && toRender.map(opt =>
                <li key={opt._id} className="cmp-dynamic-option cmp-dynamic-option-member" onClick={(ev) => onToggleMember(ev, opt._id)}>
                    <img className='cmp-dynamic-member-img'
                        src={opt.imgUrl}
                        alt={opt.imgUrl} />
                    <span className="cmp-dynamic-member-name">{opt.fullname}</span>
                    {memberIds?.includes(opt._id) && (
                        <span className="cmp-dynamic-member-checked-icon-container">
                            <BiCheck className="cmp-dynamic-member-checked-icon" />
                        </span>)}
                </li>
            )}
            {!toRender.length && <li className="cmp-dynamic-option">No member by this name</li>
            }
        </ul>
    </>
    )
}