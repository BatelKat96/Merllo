import { useRef, useState } from 'react';
import { FiPlus } from "react-icons/fi";
import { useParams } from 'react-router-dom';
import { utilService } from '../../services/util.service';
import { DynamoicModal } from '../dynamic-modal';


export function TaskDynamicLabel({ ids, add, board, type, onSaveTask, task, labelBtn, onOpenModal }) {
    var currDataType = utilService.findDataById(ids, board, type)
    const { boardId, groupId } = useParams()
    // const [modalType, setModalType] = useState()

    // const memberBtn = useRef()
    // const labelBtn = useRef()
    // console.log('type:', type)
    // console.log('labelBtn:', labelBtn)
    // console.log('memberBtn:', memberBtn)


    // function getRefData(type) {
    //     console.log('type from ref:', type)
    //     switch (type) {

    //         case 'members':
    //             return memberBtn

    //         case 'labels':
    //             return labelBtn
    //     }
    // }

    function openItemModal() {
        console.log('(type) openItemModal:', type)

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