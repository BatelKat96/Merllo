import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { utilService } from '../../../services/util.service'
// import { addNewComment } from 'store/actions/task.action'
import { AddComment } from './add-comment'
import { GrSort } from 'react-icons/gr'

export function TaskActivity({ task, onSaveTask }) {
	const board = useSelector((state) => state.boardModule.board)
	let user = useSelector((state) => state.userModule.user)

	// * data for dev
	// const task = {
	// 	comments: [
	// 		{
	// 			id: 'cm101',
	// 			txt: 'this is a comment',
	// 			createdAt: 1673973381,
	// 			byMember: {
	// 				_id: 'u103',
	// 				fullname: 'Dror K',
	// 				imgUrl:
	// 					'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
	// 			},
	// 		},
	// 	],
	// }

	// util / service functions
	function timeSince(date) {
		var seconds = Math.floor((new Date() - date) / 1000)

		var interval = seconds / 31536000

		if (interval > 1) {
			if (Math.floor(interval) === 1) return 'a year ago'
			return Math.floor(interval) + ' years ago'
		}
		interval = seconds / 2592000
		if (interval > 1) {
			if (Math.floor(interval) === 1) return 'a month ago'
			return Math.floor(interval) + ' months ago'
		}
		interval = seconds / 86400
		if (interval > 1) {
			if (Math.floor(interval) === 1) return 'a day ago'
			return Math.floor(interval) + ' days ago'
		}
		interval = seconds / 3600
		if (interval > 1) {
			if (Math.floor(interval) === 1) return 'an hour ago'
			return Math.floor(interval) + ' hours ago'
		}
		interval = seconds / 60
		if (interval > 1) {
			if (Math.floor(interval) === 1) return 'Just now'
			return Math.floor(interval) + ' minutes ago'
		}
		if (Math.floor(seconds) === 0) return 'Just now'
		return Math.floor(seconds) + ' seconds ago'
	}

	// * end of data for dev

	function getUser() {
		return user
			? user
			: {
					fullname: 'Guest',
					imgUrl:
						'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
			  }
	}

	// * this should update the task
	async function addComment(ev, commentTxt) {
		console.log('commentTxt', commentTxt)
		let newComment = {
			id: utilService.makeId(),
			txt: commentTxt,
			createdAt: Date.now(),
			byMember: getUser(),
		}
		console.log('newComment', newComment)

		let updateTask = { ...task }
		console.log('updateTask before unshift', updateTask)
		updateTask.comments.unshift(newComment)
		console.log('updateTask after unshift', updateTask)
		onSaveTask(ev, updateTask)
	}

	return (
		<section className="task-activities">
			<GrSort className="icon-activities" />
			<div className="task-activities-header">
				<p>Activity</p>
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
								/>
							</div>
							<div className="activity-description">
								<span className="username">{comment.byMember.fullname}</span>
								<span className="time">{timeSince(comment.createdAt)}</span>
								<div className="comment">{comment.txt}</div>
							</div>
						</li>
					))}
				</ul>
			)}
		</section>
	)
}
