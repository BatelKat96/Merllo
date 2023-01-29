import { TaskAttachment } from './task-attachment'

import { GrAttachment } from 'react-icons/gr'

export function TaskAttachmentPreview({ task, onSaveTask }) {
    const { attachments } = task

    function onDeleteAttachment(ev, attachmentId) {
        ev.stopPropagation()
        ev.preventDefault()

        const updateAttachments = attachments.filter(att => (att.id !== attachmentId))
        const newTask = { ...task, attachments: updateAttachments }
        onSaveTask(ev, newTask)
    }

    return <section className='task-attachments-section'>

        <div className="task-attachments-header">
            <div className='task-attachments-icon-container'>

                <GrAttachment className='task-attachments-icon' />
            </div>
            <h3 className='medium-headline task-attachments-header-title'>Attachments</h3>
        </div>
        {task.attachments.map((attachment) => {
            return <div className='task-attachment-container' key={attachment.id}>
                <TaskAttachment task={task} attachment={attachment} onSaveTask={onSaveTask} onDeleteAttachment={onDeleteAttachment} />
            </div>
        })}

    </section>
}