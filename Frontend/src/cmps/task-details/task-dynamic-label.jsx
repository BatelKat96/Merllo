import { utilService } from '../../services/util.service';

import { FiPlus } from "react-icons/fi";

export function TaskDynamicLabel({ ids, add, board, type, onSaveTask, task, labelBtn, onOpenModal }) {
    var currDataType = utilService.findDataById(ids, board, type)

    function openItemModal() {
        onOpenModal('labels')
    }

    return <div className={`task-${type}-container`}>
        <h3 className='small-headline '>{type}</h3>
        <ul className={`${type}-list clean-list`}>
            {(type === 'labels') && currDataType.map(curr =>
                <li key={curr.id} style={{ backgroundColor: `${curr.color}38` }} className="task-labels">
                    <span className='color-circle' style={{ backgroundColor: `${curr.color}` }}></span>
                    <p>{curr.title}</p>
                </li>
            )}
            <li key="add-more" className={`add-${type}`} title={`Add another ${type}`} ref={labelBtn} onClick={openItemModal} >
                <FiPlus className={`add-${type}-icon`} />
            </li>

        </ul>
    </div >
}