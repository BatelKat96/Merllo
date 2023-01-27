import { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'

import { TaskCmpDynamoic } from '../task-details-cmp/task-cmp-dynamic'
import { DynamoicModal } from '../dynamic-modal'

import { BsArchive, BsPerson, BsCheck2Square, BsSquareHalf, BsArrowCounterclockwise } from "react-icons/bs"
import { AiOutlineMinus, AiOutlineClockCircle } from "react-icons/ai"
import { ImAttachment } from "react-icons/im"
import { FiArrowRight } from "react-icons/fi"
import { MdContentCopy } from "react-icons/md"
import { TiTag } from "react-icons/ti"

export function TaskSideBar({ onRemoveTask, task, onCopyTask, onSaveTask }) {

    const { boardId, groupId, taskId } = useParams()
    const [modalType, setModalType] = useState()
    const [isArchive, setIsArchive] = useState(false)

    const memberBtn = useRef()
    const labelBtn = useRef()
    const checklistBtn = useRef()
    const datesBtn = useRef()
    const attachmentBtn = useRef()
    const coverBtn = useRef()
    const moveCardBtn = useRef()


    function getRefData(type) {
        switch (type) {
            case 'members':
                return memberBtn

            case 'labels':
                return labelBtn

            case 'checklist':
                return checklistBtn

            case 'dates':
                return datesBtn

            case 'attachment':
                return attachmentBtn

            case 'cover':
                return coverBtn

            case 'move card':
                return moveCardBtn
        }
    }


    function onOpenModal(type) {
        setModalType(type)
    }

    function onOpenArchive() {
        setIsArchive(true)
    }

    function onBackArchive() {
        setIsArchive(false)
    }


    return <div className='side-bar-menu'>
        <h3 className='small-headline'>Add to card</h3>
        <button className='clean-btn btn-task-details btn-side-bar'
            ref={memberBtn}
            onClick={() => onOpenModal('members')}
        >
            <span className='btn-side-bar-icon'>
                <BsPerson />
            </span>
            Members
        </button>

        <button className='clean-btn btn-task-details btn-side-bar'
            ref={labelBtn}
            onClick={() => onOpenModal('labels')}
        >
            <span className='btn-side-bar-icon btn-side-bar-icon-label '>
                <TiTag />
            </span>
            Labels
        </button>

        <button className='clean-btn btn-task-details btn-side-bar'
            ref={checklistBtn}
            onClick={() => onOpenModal('checklist')}
        >
            <span className='btn-side-bar-icon'>
                <BsCheck2Square />
            </span>
            Checklist
        </button>

        <button className='clean-btn btn-task-details btn-side-bar'
            ref={datesBtn}
            onClick={() => onOpenModal('dates')}
        >
            <span className='btn-side-bar-icon'>
                <AiOutlineClockCircle />
            </span>
            Dates
        </button>

        <button className='clean-btn btn-task-details btn-side-bar'
            ref={attachmentBtn}
            onClick={() => onOpenModal('attachment')}
        >
            <span className='btn-side-bar-icon'>
                <ImAttachment />
            </span>
            Attachment
        </button>

        <button className='clean-btn btn-task-details btn-side-bar'
            ref={coverBtn}
            onClick={() => onOpenModal('cover')}
        >
            <span className='btn-side-bar-icon btn-side-bar-icon-label'>
                <BsSquareHalf />
            </span>
            Cover
        </button>

        <h3 className='small-headline side-bar-menu-second-section'>Actions</h3>

        <button className='clean-btn btn-task-details btn-side-bar'
            onClick={() => { onRemoveTask() }}>
            <span className='btn-side-bar-icon'>
                <FiArrowRight />
            </span>
            Move
        </button>

        <button className='clean-btn btn-task-details btn-side-bar'
            onClick={onCopyTask}>
            <span className='btn-side-bar-icon'>
                <MdContentCopy />
            </span>
            Copy
        </button>

        <hr className='task-side-bar-hr' />

        {!isArchive &&
            <button className='clean-btn btn-task-details btn-side-bar'
                onClick={onOpenArchive}>
                <span className='btn-side-bar-icon'>
                    <BsArchive />
                </span>
                Archive
            </button>
        }

        {isArchive &&
            <div className='btns-task-details-archive'>
                <button className='clean-btn btn-task-details btn-side-bar'
                    onClick={onBackArchive}>
                    <span className='btn-side-bar-icon btn-side-bar-icon-label'>
                        <BsArrowCounterclockwise />
                    </span>
                    Send to board
                </button>

                <button className='clean-btn btn-task-details btn-side-bar btn-remove-side-bar'
                    onClick={onRemoveTask}>
                    <span className='btn-side-bar-icon'>
                        <AiOutlineMinus />
                    </span>
                    Delete
                </button>
            </div>
        }

        {modalType && <TaskCmpDynamoic
            cmpType={modalType}
            refDataBtn={getRefData(modalType)}
            task={task}
            groupId={groupId}
            boardId={boardId}
            onOpenModal={onOpenModal}
            onSaveTask={onSaveTask} />}

        {/* {modalType && <DynamoicModal
            cmpType={modalType}
            refDataBtn={getRefData(modalType)}
            task={task}
            groupId={groupId}
            boardId={boardId}
            onOpenModal={onOpenModal}
            onSaveTask={onSaveTask} />} */}
    </div >
}
