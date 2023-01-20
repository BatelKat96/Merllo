import { FiPlus } from "react-icons/fi";

export function TaskMember({ memberIds, addMember }) {

    return <div className='task-members-container'>
        <h3 className='small-headline'>Members</h3>
        <ul className='members-list clean-list'>
            {memberIds && memberIds.map(member =>
                <li key={member}>
                    <img className='member-img' src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" alt={member} title={member} />
                </li>
            )}

            <li key="add-more" className='add-member' title="Add another member" onClick={() => { '#' }} >
                <FiPlus className='add-member-icon' onClick={() => { addMember() }} />
            </li>

            {/* <img src={byMember.imgUrl} alt={byMember.username} /> onclick to add memeber */}
        </ul>
    </div>
}