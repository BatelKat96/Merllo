import { useState } from 'react'
import { TaskCmpDynamoic } from '../task-details-cmp/task-cmp-dynamic';

import { BsArchive, BsPerson, BsTag, BsCheck2Square } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";

export function TaskSideBar({ onRemoveTask }) {

    const [openModal, toggleOpenModal] = useState(false)

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
        {openModal && <TaskCmpDynamoic cmpType={'members'}
            onOpenModal={onOpenModal} />}

        <button className='clean-btn btn-task-details btn-side-bar' onClick={onOpenModal}>
            <span className='btn-side-bar-icon'>
                <BsTag />
            </span>
            Labels
        </button>
        {openModal && <TaskCmpDynamoic cmpType={'labels'}
            onOpenModal={onOpenModal} />}

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
