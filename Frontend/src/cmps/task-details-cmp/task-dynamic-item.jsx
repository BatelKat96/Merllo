import { useRef, useState } from 'react';
import { FiPlus } from "react-icons/fi";
import { useParams } from 'react-router-dom';
import { utilService } from '../../services/util.service';
import { DynamoicModal } from '../dynamic-modal';


export function TaskDynamicItem({ ids, add, board, type, onSaveTask, task }) {
    var currDataType = utilService.findDataById(ids, board, type)
    const { boardId, groupId } = useParams()
    const [modalType, setModalType] = useState()

    const memberBtn = useRef()
    const labelBtn = useRef()

    function getRefData(type) {
        switch (type) {
            case 'members':
                return memberBtn

            case 'labels':
                return labelBtn
        }
    }

    function onOpenModal(type) {
        setModalType(type)
    }
    console.log('modalType:', modalType)



    return <div className={`task-${type}-container`}>
        <h3 className='small-headline '>{type}</h3>
        <ul className={`${type}-list clean-list`}>
            {(type === 'members') && currDataType.map(curr =>
                <li key={curr._id}>
                    <img className='member-img' src={curr.imgUrl} alt={curr.fullname} title={curr.fullname} />
                </li>
            )}
            {(type === 'labels') && currDataType.map(curr =>
                <li key={curr.id} style={{ backgroundColor: `${curr.color}38` }} className="task-labels">
                    <span className='color-circle' style={{ backgroundColor: `${curr.color}` }}></span>
                    <p>{curr.title}</p>
                </li>
            )}

            <li key="add-more" className={`add-${type}`} title={`Add another ${type}`} ref={getRefData(type)} onClick={() => onOpenModal(type)} >
                {/* <FiPlus className={`add-${type}-icon`} onClick={() => console.log('wow')} /> */}
                <FiPlus className={`add-${type}-icon`} />
            </li>
        </ul>


        {
            modalType && <DynamoicModal
                cmpType={modalType}
                refDataBtn={getRefData(modalType)}
                task={task}
                groupId={groupId}
                boardId={boardId}
                onOpenModal={onOpenModal}
                onSaveTask={onSaveTask} />
        }
    </div >
}