import { FiPlus } from "react-icons/fi";


export function TaskDynamicItem({ ids, add, board, type }) {

    console.log('ids:', ids)

    var currDataType = findDataById(ids)

    function findDataById(ids) {
        if (!ids) return
        let currType = board[type]
        console.log('currType:', currType)
        let fullData = []
        ids.map(id => {
            console.log('id:', id)
            if (type === 'members') {
                // console.log('yes:',)

                currType.find((t) => {
                    // console.log('t:', t)

                    // if (t._id === id) return t
                    if (t._id === id) fullData.push(t)
                })
            }
            else if (type === 'labels') {
                currType.find((t) => {
                    if (t.id === id) fullData.push(t)
                })
            }
        })
        console.log('fullData:', fullData)

        return fullData
    }

    return <div className={`task-${type}-container`}>
        <h3 className='small-headline '>{type}</h3>
        <ul className={`${type}-list clean-list`}>
            {(type === 'members') && currDataType.map(curr =>
                <li key={curr._id}>
                    <img className='member-img' src={require(`../../assets/img/members-task-details/${curr.imgUrl}`)} alt={curr.fullname} title={curr.fullname} />
                </li>
            )}
            {(type === 'labels') && currDataType.map(curr =>
                <li key={curr._id} style={{ backgroundColor: `${curr.color}38` }} className="task-labels">
                    <span className='color-circle' style={{ backgroundColor: `${curr.color}` }}></span>
                    <p>{curr.title}</p>
                </li>
            )}


            <li key="add-more" className={`add-${type}`} title={`Add another ${type}`} onClick={() => { '#' }} >
                <FiPlus className={`add-${type}-icon`} onClick={() => { add() }} />
            </li>
        </ul>
    </div>
}