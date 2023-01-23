import { useState } from 'react'
import { TaskCmpDynamoic } from '../task-details-cmp/task-cmp-dynamic';

import { BsArchive, BsPerson, BsTag, BsCheck2Square } from "react-icons/bs";
import { TiTag } from "react-icons/ti";
import { AiOutlineMinus } from "react-icons/ai";
import { useParams } from 'react-router-dom';

export function TaskSideBar({ onRemoveTask, task }) {


    const [openModal, toggleOpenModal] = useState(false)
    const { boardId, groupId, taskId } = useParams()

    function onOpenModal(ev) {
        // ev.stopPropagation()
        // ev.preventDefault()
        toggleOpenModal(!openModal)
    }


    return <div className='side-bar-menu'>
        <h3 className='small-headline'>Add to card</h3>
        <button className='clean-btn btn-task-details btn-side-bar' onClick={onOpenModal}
        >
            <span className='btn-side-bar-icon'>
                <BsPerson />
            </span>
            Members
        </button>
        {openModal && <TaskCmpDynamoic
            cmpType={'members'}
            task={task}
            groupId={groupId}
            boardId={boardId}
            onOpenModal={onOpenModal} />}

        <button className='clean-btn btn-task-details btn-side-bar' onClick={(event) => onOpenModal(event, 'labels')}>
            <span className='btn-side-bar-icon btn-side-bar-icon-label '>
                <TiTag />
            </span>
            Labels
        </button>
        {/* {openModal && <TaskCmpDynamoic cmpType={'labels'}
            onOpenModal={onOpenModal} />} */}

        <button className='clean-btn btn-task-details btn-side-bar '>
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

    </div >
}
