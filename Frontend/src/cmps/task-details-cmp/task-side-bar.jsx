import { useState, useRef } from 'react'
import { TaskCmpDynamoic } from '../task-details-cmp/task-cmp-dynamic';
import { BsArchive, BsPerson, BsTag, BsCheck2Square } from "react-icons/bs";
import { TiTag } from "react-icons/ti";
import { AiOutlineMinus } from "react-icons/ai";
import { useParams } from 'react-router-dom';

export function TaskSideBar({ onRemoveTask, task }) {
    // const [openModal, toggleOpenModal] = useState(false)
    const { boardId, groupId, taskId } = useParams()
    const [modalType, setModalType] = useState()

    const memberBtn = useRef()
    const labelBtn = useRef()
    const checklistBtn = useRef()

    function getRefData(type) {
        switch (type) {
            case 'members':
                return memberBtn

            case 'labels':
                return labelBtn

            case 'checklist':
                return checklistBtn
        }
    }

    // function onOpenModal(ev, type) {
    //     console.log('onOpenModal', type);
    //     // ev.stopPropagation()
    //     // ev.preventDefault()
    //     refData(type)
    //     getBtnPos(refDataBtn)
    //     toggleOpenModal(!openModal)
    // }

    function onOpenModal(ev, type) {
        setModalType(type)
    }


    return <div className='side-bar-menu'>
        <h3 className='small-headline'>Add to card</h3>
        <button className='clean-btn btn-task-details btn-side-bar'
            // onClick={onOpenModal}
            onClick={(event) => onOpenModal(event, 'members')}
            ref={memberBtn}
        >
            <span className='btn-side-bar-icon'>
                <BsPerson />
            </span>
            Members
        </button>

        <button className='clean-btn btn-task-details btn-side-bar'
            onClick={(event) => onOpenModal(event, 'labels')}
            ref={labelBtn}
        >
            <span className='btn-side-bar-icon btn-side-bar-icon-label '>
                <TiTag />
            </span>
            Labels
        </button>

        <button className='clean-btn btn-task-details btn-side-bar'
            // onClick={onOpenModal}
            onClick={(event) => onOpenModal(event, 'checklist')}
            ref={checklistBtn}
        >
            <span className='btn-side-bar-icon'>
                <BsCheck2Square />
            </span>
            Checklist
        </button>

        <h3 className='small-headline'>Actions</h3>
        {/* <button className='clean-btn btn-side-bar btn-archive-side-bar' onClick={()=>{}}><span className='btn-side-bar-icon'><BsArchive /></span>Archive</button> */}

        <button className='clean-btn btn-task-details btn-side-bar btn-remove-side-bar' onClick={() => { onRemoveTask() }}>
            <span className='btn-side-bar-icon'>
                <AiOutlineMinus />
            </span>
            Delete
        </button>

        {modalType && <TaskCmpDynamoic
            cmpType={modalType}
            refDataBtn={getRefData(modalType)}
            task={task}
            groupId={groupId}
            boardId={boardId}
            onOpenModal={onOpenModal} />}
    </div >
}
