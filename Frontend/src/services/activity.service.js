import { updateBoard } from '../store/board.actions'
import { boardService } from './board.service'
import { userService } from './user.service'
import { utilService } from './util.service'

export const activityService = {
	addActivity,
}

// * data for dev

// activity object example
const activityEx = {
	id: utilService.makeId(),
	txt: 'Changed Color',
	createdAt: Date.now(),
	byMember: userService.getLoggedinUser(),
	task: 'task', //this should be a mini task object
}

// board key example
// this should be a key with : not =
let activitiesEx = [
	{
		id: 'a101',
		txt: 'Changed Color',
		createdAt: 154514,
		byMember: {
			_id: 'u101',
			fullname: 'Abi Abambi',
			imgUrl: 'http://some-img',
		},
		task: {
			id: 'c101',
			title: 'Replace Logo',
		},
	},
]

// * end of data for dev

function addActivity(txt, task, boardId, comment, user) {
	console.log(txt, task, boardId, comment, user)
	const board = {}

	const miniUser = user || userService.getLoggedinUser()

	const miniTask = task ? { id: task.id, title: task.title } : null

	console.log('miniUser', miniUser, 'miniTask', miniTask)

	const activity = {
		id: utilService.makeId(),
		txt,
		createdAt: Date.now(),
		byMember: miniUser,
		task: miniTask,
	}

	console.log('activity', activity)

	if (comment) activity.comment = comment

	if (board.activities) board.activities.unshift(activity)
	else board.activities = [activity]

	console.log('board', board)
}
