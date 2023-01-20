import { useNavigate } from 'react-router-dom'


export function QuickTaskEdit({ taskId, groupId, boardId, onEdit, quickTaskEdit }) {
    const navigate = useNavigate()

    const onOpenCard = () => {
        navigate(`/board/${boardId}/${groupId}/${taskId}`)
    }

    return (
        <>
            <section className="open-quick-task-edit" onClick={(ev) => onEdit(ev, !quickTaskEdit)}>

                <button>Save</button>
            </section>

            <section className="quick-edit-btns">
                <button onClick={onOpenCard}>Open card</button>
                <button>Edit labels</button>
                <button>Change members</button>
                <button>Change cover</button>
                <button>Move</button>
                <button>Copy</button>
                <button>Edit dates</button>
                <button>Delete</button>
            </section>
        </>
    )
}