import { BsArchive, BsPerson, BsTag, BsCheck2Square } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";

export function TaskSideBar({ onRemoveTask }) {
    return <div className='side-bar-menu'>
        <h3 className='small-headline'>Add to card</h3>

        <button className='clean-btn btn-task-details btn-side-bar'>
            <span className='btn-side-bar-icon'>
                <BsPerson />
            </span>
            Members
        </button>

        <button className='clean-btn btn-task-details btn-side-bar'>
            <span className='btn-side-bar-icon'>
                <BsTag />
            </span>
            Labels
        </button>

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
