import description from '../../assets/img/icons-task-details/description.svg'


export function TaskDescription({ handleChange, onSaveEdit, task }) {

    return <div className='task-description-container'>
        <img className='icon description-icon' src={description} />
        <form onBlurCapture={onSaveEdit}>
            <label htmlFor="description" className='medium-headline'>Description</label>
            <textarea
                name="description"
                className='description'
                id="description"
                onChange={handleChange}
                defaultValue={task.description}
                placeholder="Add a more detailed description..."
            ></textarea>

            {/* <button className='btn clean-btn'>Save</button>
                    <Link to="/toy" className="btn">Back to List</Link> */}

        </form >

    </div>
}
