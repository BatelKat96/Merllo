import { useSelector } from 'react-redux'

import { utilService } from '../../../services/util.service'
import { AddComment } from './add-comment'

import { IoList } from 'react-icons/io5'

export function TaskActivity({ task, onSaveTask }) {
	const board = useSelector((state) => state.boardModule.board)
	let user = useSelector((state) => state.userModule.user)

	function getUser() {
		return user
			? user
			: {
					fullname: 'Guest',
					imgUrl:
						'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
			  }
	}

	async function addComment(ev, commentTxt) {
		let newComment = {
			id: utilService.makeId(),
			txt: commentTxt,
			createdAt: Date.now(),
			byMember: getUser(),
		}
		let updateTask = { ...task }
		updateTask.comments.unshift(newComment)
		onSaveTask(ev, updateTask)
	}

	return (
		<section className="task-activities">
			<IoList className="icon-activities" />
			<div className="task-activities-header">
				<h3 className="medium-headline">Activity</h3>
			</div>

			<AddComment user={getUser()} addComment={addComment} />

			{task.comments && task.comments.length !== 0 && (
				<ul className="clean-list task-activity-list">
					{task.comments.map((comment) => (
						<li key={comment.id} className="activity-preview">
							<div className="preview-member-img">
								<img
									src={comment.byMember.imgUrl}
									referrerPolicy="no-referrer"
									alt="member"
									style={{ borderRadius: '50%' }}
								/>
							</div>
							<div className="activity-description">
								<span className="username">{comment.byMember.fullname}</span>
								<span className="time">
									{utilService.timeSince(comment.createdAt)}
								</span>
								<div className="comment">{comment.txt}</div>
							</div>
						</li>
					))}
				</ul>
			)}
		</section>
	)
}