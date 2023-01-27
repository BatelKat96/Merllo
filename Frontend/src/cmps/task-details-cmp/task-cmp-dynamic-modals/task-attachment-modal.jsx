import { boardService } from '../../../services/board.service'
import { uploadService } from '../../../services/upload.service'

export function TaskAttachmentModal({ task, onSaveTask, onClose }) {
    let updateTask = { ...task }


    function onAttachLink(ev) {
        onSaveTask(ev, updateTask)
        onClose()
    }

    async function onUploadImg(ev) {
        const url = await uploadService.uploadImg(ev)
        let newAttachment = boardService.getEmptyAttachment()
        newAttachment.url = url
        updateTask.attachments.push(newAttachment)
    }


    return <section>
        <input type="file" accept="image/*" onChange={onUploadImg} />
        <p>Computer</p>
        <button className='clean-btn btn-task-details' onClick={onAttachLink}>Attach</button>

        {task.attachments.length && <p>{task.attachments[0].url}</p>}
    </section>
}