import { utilService } from '../../services/util.service';

import { FiPlus } from "react-icons/fi";

export function TaskDynamicMember({ ids, add, board, type, onSaveTask, memberBtn, task, onOpenModal }) {
    var currDataType = utilService.findDataById(ids, board, type)

    function openItemModal() {
        onOpenModal('members')
    }

    return <div className={`task-${type}-container`}>
        <h3 className='small-headline '>{type}</h3>
        <ul className={`${type}-list clean-list`}>
            {(type === 'members') && currDataType.map(curr =>
                <li key={curr._id}>
                    <img className='member-img' src={curr.imgUrl} alt={curr.fullname} title={curr.fullname} />
                </li>

            )}

            <li key="add-more" className={`add-${type}`} title={`Add another ${type}`} ref={memberBtn} onClick={openItemModal} >
                <FiPlus className={`add-${type}-icon`} />
            </li>

        </ul>
    </div >
}