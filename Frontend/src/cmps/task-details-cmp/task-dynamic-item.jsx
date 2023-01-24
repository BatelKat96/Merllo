import { FiPlus } from "react-icons/fi";
import { utilService } from '../../services/util.service';


export function TaskDynamicItem({ ids, add, board, type }) {
    var currDataType = utilService.findDataById(ids, board, type)

    return <div className={`task-${type}-container`}>
        <h3 className='small-headline '>{type}</h3>
        <ul className={`${type}-list clean-list`}>
            {(type === 'members') && currDataType.map(curr =>
                <li key={curr._id}>
                    <img className='member-img' src={curr.imgUrl} alt={curr.fullname} title={curr.fullname} />
                </li>
            )}
            {(type === 'labels') && currDataType.map(curr =>
                <li key={curr.id} style={{ backgroundColor: `${curr.color}38` }} className="task-labels">
                    <span className='color-circle' style={{ backgroundColor: `${curr.color}` }}></span>
                    <p>{curr.title}</p>
                </li>
            )}



            <li key="add-more" className={`add-${type}`} title={`Add another ${type}`} onClick={() => { '#' }} >
                <FiPlus className={`add-${type}-icon`} onClick={(ev) => { add('u103') }} />
            </li>
        </ul>
    </div>
}