import { utilService } from '../../services/util.service'
import { BsSquareHalf } from 'react-icons/bs'


export function TaskAttachment({ task, attachment, onSaveTask, onDeleteAttachment }) {

    function onToggleTaskCover(ev) {
        let updateTask = { ...task }
        if (!updateTask.style) updateTask.style = {}
        const taskStyle = updateTask.style
        console.log('updateTask:', updateTask)

        if (taskStyle) {
            if (taskStyle.background === attachment.url) {
                taskStyle.background = null
            } else {
                taskStyle.background = `url("${attachment.url}") center center / cover`
                taskStyle.backgroundColor = null
            }
        } else {
            taskStyle = { background: `url("${attachment.url}") center center / cover` }
        }
        onSaveTask(ev, updateTask)
    }

    return <>
        <div className="task-attachment-preview-img-container">

            <a href={attachment.url}
                target={'_blank'}
                rel="noreferrer"
            >  <img className="task-attachment-preview-img" src={attachment.url} alt='attachment-img'>
                </img> </a>
        </div>

        <section className="attachment-details">
            <section className="attachment-name-and-options">
                <p className="attachment-name">{attachment.title}</p>
                <span>Added {utilService.timeSince(attachment.createdAt)}</span>
                <p className="attachment-remove" onClick={(ev) => onDeleteAttachment(ev, attachment.id)}>
                    Delete
                </p>
            </section>
            <div className="make-attachment-cover" onClick={onToggleTaskCover} >

                <section className="make-attachment-cover-icon-container">
                    <BsSquareHalf
                        className="make-attachment-cover-icon"
                        style={{
                            transform:
                                'rotate(0.75turn) translateY(-20%) translateX(22%)',
                        }}
                    />
                </section>
                {task.style?.coverImg === attachment.url
                    ? <p className="make-attachment-cover-p">Remove cover</p>
                    : <p className="make-attachment-cover-p">Make cover</p>}

            </div>
        </section>
    </>

}