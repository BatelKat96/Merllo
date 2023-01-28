import { useState } from 'react'
import { boardService } from '../../../services/board.service'
import { uploadService } from '../../../services/upload.service'

export function TaskAttachmentModal({ task, onSaveTask, onClose }) {
    const [fileName, setFileName] = useState('')
    let updateTask = { ...task }


    function onAttachLink(ev) {
        onSaveTask(ev, updateTask)
        onClose()
    }

    async function onUploadImg(ev) {
        setFileName(ev.target.files[0].name)
        const url = await uploadService.uploadImg(ev)
        let newAttachment = boardService.getEmptyAttachment()

        newAttachment.url = url
        newAttachment.title = ev.target.files[0].name
        updateTask.attachments.push(newAttachment)
    }


    return <section className='task-attachment-dynamic-modal'>
        <div className='task-attachment-dynamic-add-container' >
            <div className='task-attachment-dynamic-add' >
                <input type="file" id="myfile" accept="image/*" onChange={onUploadImg} className="task-attachment-dynamic-modal-input" />
                <label htmlFor='myfile' className='task-attachment-dynamic-p'>Computer </label>
            </div>
        </div>
        <button className='clean-btn btn-task-details' onClick={onAttachLink}>
            Attach
        </button>
        <span className='task-attachment-dynamic-file-name'>{fileName}</span>
    </section>
}