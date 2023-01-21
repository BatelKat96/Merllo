import { FiPlus } from "react-icons/fi";

export function TaskMember({ ids, add, board, type }) {
    console.log('ids:', ids)
    console.log('add:', add)
    console.log('board:', board)
    console.log('board:', board[type])
    console.log('type:', type)


    // var currMembers = findMembersById(memberIds)

    // function findMembersById(memberIds) {
    //     if (!memberIds) return
    //     let members = board.members
    //     let fullMembers = []
    //     memberIds.map(memberId => {
    //         members.find((m) => {
    //             if (m._id === memberId) fullMembers.push(m)
    //         })
    //     })
    //     return fullMembers
    // }

    // return <div className='task-members-container'>
    //     <h3 className='small-headline'>Members</h3>
    //     <ul className='members-list clean-list'>
    //         {memberIds && currMembers.map(currMember =>
    //             <li key={currMember._id}>
    //                 <img className='member-img' src={require(`../../assets/img/members-task-details/${currMember.imgUrl}`)} alt={currMember.fullname} title={currMember.fullname} />
    //             </li>
    //         )}

    //         <li key="add-more" className='add-member' title="Add another member" onClick={() => { '#' }} >
    //             <FiPlus className='add-member-icon' onClick={() => { addMember() }} />
    //         </li>  
    //     </ul> 
    // </div> 


}

//memberIds , addMembers, board, members
// { ids, add, board, type }

// var currDataType = findDataById(ids)

// function findDataById(ids) {
//     if (!ids) return
//     let type = board.type
//     let fullData = []
//     ids.map(id => {
//         type.find((t) => {
//             if (type === 'members') {
//                 if (t._id === id) fullData.push(t)
//             }
//             else if (type === 'labels') {
//                 if (t.id === id) fullData.push(t)
//             }
//         })
//     })
//     return fullData
// }

// return <div className={`task-${type}-container`}>
//     <h3 className='small-headline '>Members</h3>
//     <ul className={`${type}-list clean-list`}>
//         {(type === 'members') && currDataType.map(curr =>
//             <li key={curr._id}>
//                 <img className='member-img' src={require(`../../assets/img/members-task-details/${currMember.imgUrl}`)} alt={currMember.fullname} title={currMember.fullname} />
//             </li>
//         )}
//         {(type === 'labels') && currDataType.map(curr =>
//             <li key={curr._id} style={{ backgroundColor: `${curr.color}38` }}>
//                 <span className='color-circle' style={{ backgroundColor: `${curr.color}` }}></span>
//                 <p>{curr.title}</p>
//             </li>
//         )}


//         <li key="add-more" className={`add-${type}`} title={`Add another ${type}`} onClick={() => { '#' }} >
//             <FiPlus className={`add-${type}-icon`} onClick={() => { add() }} />
//         </li>
//     </ul>
// </div>