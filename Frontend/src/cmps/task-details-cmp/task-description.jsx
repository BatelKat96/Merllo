import description from '../../assets/img/icons-task-details/description.svg'


export function TaskDescription({ handleChange, onSaveEdit, task }) {

    return <div className='task-description-container'>
        <img className='icon description-icon' src={description} />
        <div>

            <h3 className='medium-headline task-description-title'>Description</h3>
            <button className='clean-btn btn-task-details btn-description-edit'>Edit</button>
        </div>
        {/* <label htmlFor="description" className='medium-headline task-description-label'>Description</label> */}
        <form onSubmit={onSaveEdit}>
            <textarea
                name="description"
                className='task-description-textarea'
                id="description"
                onChange={handleChange}
                defaultValue={task.description}
                placeholder="Add a more detailed description..."
            ></textarea>
            <div className='task-description-btn'>
                <button className='clean-btn btn-task-details btn-description-save'>Save</button>
                <button className='clean-btn btn-description-cancel btn-task-details btn-description-cancel  '>Cancel</button>
            </div>


        </form >

    </div>
}
