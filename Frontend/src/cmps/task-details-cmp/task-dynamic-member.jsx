import { useRef, useState } from 'react';
import { FiPlus } from "react-icons/fi";
import { useParams } from 'react-router-dom';
import { utilService } from '../../services/util.service';
import { DynamoicModal } from '../dynamic-modal';


export function TaskDynamicMember({ ids, add, board, type, onSaveTask, memberBtn, task, onOpenModal }) {
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

        onOpenModal('members')
    }
    // console.log('modalType:', modalType)



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


        {/* {
            modalType && <DynamoicModal
                cmpType={modalType}
                refDataBtn={getRefData(modalType)}
                task={task}
                groupId={groupId}
                boardId={boardId}
                onOpenModal={onOpenModal}
                onSaveTask={onSaveTask} />
        } */}
    </div >
}