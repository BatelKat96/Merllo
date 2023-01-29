import { GrSort } from 'react-icons/gr'
import { useSelector } from 'react-redux'
import { utilService } from '../../../services/util.service'

export function ActivityLog() {
	const board = useSelector((state) => state.boardModule.board)
	let user = useSelector((state) => state.userModule.user)

	// const board = {
	// 	title: 'Stam board',
	// 	isStarred: false,
	// 	archivedAt: null,
	// 	createdBy: {},
	// 	style: {
	// 		background: '',
	// 		thumbnail: '',
	// 		backgroundColor: '',
	// 	},
	// 	labels: [],
	// 	members: [],
	// 	groups: [],
	// 	activities: [
	// 		{
	// 			id: 'a101',
	// 			txt: 'Changed Color',
	// 			createdAt: Date.now(),
	// 			byMember: {
	// 				_id: 'u101',
	// 				fullname: 'Abi Abambi',
	// 				imgUrl:
	// 					'https://trello-members.s3.amazonaws.com/63bab33d151c0c01befa37ef/619d7095c4aabefc9291f818fd1852cc/170.png',
	// 			},
	// 			task: {
	// 				id: 'c101',
	// 				title: 'Replace Logo',
	// 			},
	// 		},
	// 		{
	// 			id: 'a102',
	// 			txt: 'Added a new list in this board bla blablahhh blahahhh',
	// 			createdAt: Date.now(),
	// 			byMember: {
	// 				_id: 'u102',
	// 				fullname: 'Another user',
	// 				imgUrl:
	// 					'https://trello-members.s3.amazonaws.com/63bab33d151c0c01befa37ef/619d7095c4aabefc9291f818fd1852cc/170.png',
	// 			},
	// 			task: {
	// 				id: 'c101',
	// 				title: 'Replace Logo',
	// 			},
	// 		},
	// 	],
	// }

	// const getUser = () => {
	// 	return user
	// 		? user
	// 		: {
	// 				fullname: 'Guest',
	// 				imgUrl:
	// 					'http://res.cloudinary.com/frello/image/upload/v1663584273/u9nkwkywyxv8mogk9q2b.jpg',
	// 		  }
	// }

	return (
		<section className="board-activity-log">
			<p className="board-activity-log-header">Activity</p>

			{board.activities && board.activities.length !== 0 && (
				<ul className="clean-list board-activity-list">
					{board.activities.map((activity) => (
						<li className="board-activity-preview" key={activity.id}>
							<div className="member-img">
								<img
									src={activity.byMember.imgUrl}
									referrerPolicy="no-referrer"
									alt="member"
								/>
							</div>
							<section className="board-activity-description">
								<p>
									<span className="username">{activity.byMember.fullname}</span>
									<span className="activity-txt">{activity.txt}</span>
								</p>
								<p className="time">
									{utilService.timeSince(activity.createdAt)}
								</p>
							</section>
						</li>
					))}
				</ul>
			)}
		</section>
	)
}
