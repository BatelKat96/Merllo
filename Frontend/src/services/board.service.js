import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
// import { httpService } from './http.service.js'
import { userService } from './user.service.js'

import boardsData from '../data/demo-data.json'
console.log(':', boardsData)

const STORAGE_KEY = 'board'

export const boardService = {
	query,
	getById,
	save,
	remove,
	getEmptyBoard,
	queryGroups,
	getGroupById,
	saveGroup,
	removeGroup,
	getEmptyGroup,
	queryTasks,
	getTaskById,
	removeTask,
	saveTask,
	getEmptyTask,
}
window.cs = boardService

_createBoards()

// * board service
async function query(filterBy = { title: '' }) {
	var boards = await storageService.query(STORAGE_KEY)
	// here we will add filters
	return boards
	// return httpService.get(STORAGE_KEY, filterBy)
}

async function getById(boardId) {
	return await storageService.get(STORAGE_KEY, boardId)
	// return httpService.get(`board/${boardId}`)
}

async function remove(boardId) {
	await storageService.remove(STORAGE_KEY, boardId)
	// return httpService.delete(`board/${boardId}`)
}

async function save(board) {
	var savedBoard
	if (board._id) {
		savedBoard = await storageService.put(STORAGE_KEY, board)
		// savedBoard = await httpService.put(`board/${board._id}`, board)
	} else {
		// Later, owner is set by the backend
		board.createdBy = userService.getLoggedinUser()
		savedBoard = await storageService.post(STORAGE_KEY, board)
		// savedBoard = await httpService.post('board', board)
	}
	console.log('savedBoard post', savedBoard);
	return savedBoard
}

function getEmptyBoard() {
	return {
		title: '',
		isStarred: false,
		archivedAt: null,
		createdBy: {},
		style: {
			background: '',
			thumbnail: '',
			backgroundColor: '',
		},
		labels: [],
		members: [],
		groups: [],
	}
}

function _createBoards() {
	let boards = utilService.loadFromStorage(STORAGE_KEY)
	if (!boards) {
		boards = boardsData
		// boards = [
		// 	{
		// 		_id: 'b101',
		// 		title: 'Demo',
		// 		isStarred: true,
		// 		archivedAt: null,
		// 		createdBy: {
		// 			_id: 'u101',
		// 			fullname: 'Batel K',
		// 			imgUrl: 'http://batel-img',
		// 		},
		// 		style: {},
		// 		labels: [
		// 			{
		// 				id: 'l101',
		// 				title: 'UI',
		// 				color: '#7bc86c',
		// 			},
		// 			{
		// 				id: 'l102',
		// 				title: 'Low priority',
		// 				color: '#f5dd29',
		// 			},
		// 			{
		// 				id: 'l103',
		// 				title: 'Medium priority',
		// 				color: '#ffaf3f',
		// 			},
		// 			{
		// 				id: 'l104',
		// 				title: 'High priority',
		// 				color: '#ef7564',
		// 			},
		// 			{
		// 				id: 'l105',
		// 				title: 'Bug',
		// 				color: '#cd8de5',
		// 			},
		// 		],
		// 		members: [
		// 			{
		// 				_id: 'u101',
		// 				fullname: 'Batel K',
		// 				imgUrl: 'batel.png',
		// 			},
		// 			{
		// 				_id: 'u102',
		// 				fullname: 'Beta S',
		// 				imgUrl: 'beta.png',
		// 			},
		// 			{
		// 				_id: 'u103',
		// 				fullname: 'Dror K',
		// 				imgUrl: 'dror.png',
		// 			},
		// 		],
		// 		groups: [
		// 			{
		// 				id: 'g101',
		// 				title: 'Backlog-client',
		// 				tasks: [
		// 					{
		// 						id: 'c101',
		// 						title: 'Basic CRUDL',
		// 						archivedAt: null,
		// 						labelIds: ['l104'],
		// 						dueDate: 1674837381,
		// 						byMember: {
		// 							_id: 'u103',
		// 							username: 'Dror',
		// 							fullname: 'Dror K',
		// 							imgUrl: 'http://dror-img',
		// 						},
		// 						comments: [
		// 							{
		// 								id: 'cm101',
		// 								txt: 'this is a comment',
		// 								createdAt: 1673973381,
		// 								byMember: {
		// 									_id: 'u103',
		// 									fullname: 'Dror K',
		// 									imgUrl: 'http://dror-img',
		// 								},
		// 							},
		// 						],
		// 					},
		// 					{
		// 						id: 'c102',
		// 						title: 'Build app footer',
		// 						description: 'description',
		// 						archivedAt: null,
		// 						labelIds: ['l103'],
		// 						dueDate: 1674664581,
		// 						byMember: {
		// 							_id: 'u103',
		// 							username: 'Dror',
		// 							fullname: 'Dror K',
		// 							imgUrl: 'http://dror-img',
		// 						},
		// 						style: {
		// 							bgColor: '#7bc86c',
		// 						},
		// 					},
		// 				],
		// 			},
		// 			{
		// 				id: 'g102',
		// 				title: 'Backlog-server',
		// 				tasks: [
		// 					{
		// 						id: 'c103',
		// 						title: 'User authentication',
		// 						archivedAt: null,
		// 						labelIds: ['l101', 'l103'],
		// 						dueDate: 1674491781,
		// 						byMember: {
		// 							_id: 'u103',
		// 							username: 'Dror',
		// 							fullname: 'Dror K',
		// 							imgUrl: 'http://dror-img',
		// 						},
		// 						style: {
		// 							bgColor: '#29cce5',
		// 						},
		// 					},
		// 					{
		// 						id: 'c104',
		// 						title: 'Create services',
		// 						archivedAt: null,
		// 						labelIds: ['l102'],
		// 						dueDate: 1674578181,
		// 						byMember: {
		// 							_id: 'u103',
		// 							username: 'Dror',
		// 							fullname: 'Dror K',
		// 							imgUrl: 'http://dror-img',
		// 						},
		// 						checklists: [
		// 							{
		// 								id: 'cl101',
		// 								title: 'Checklist',
		// 								todos: [
		// 									{
		// 										id: 'td101',
		// 										title: 'Board',
		// 										isDone: false,
		// 									},
		// 									{
		// 										id: 'td102',
		// 										title: 'User',
		// 										isDone: false,
		// 									},
		// 									{
		// 										id: 'td103',
		// 										title: 'Task',
		// 										isDone: false,
		// 									},
		// 								],
		// 							},
		// 						],
		// 					},
		// 				],
		// 			},
		// 			{
		// 				id: 'g103',
		// 				title: 'In development',
		// 				tasks: [
		// 					{
		// 						id: 'c105',
		// 						title: 'Support sockets',
		// 						archivedAt: null,
		// 						labelIds: ['l103'],
		// 						dueDate: 1674664581,
		// 						byMember: {
		// 							_id: 'u103',
		// 							username: 'Dror',
		// 							fullname: 'Dror K',
		// 							imgUrl: 'http://dror-img',
		// 						},
		// 						memberIds: ['u101', 'u103'],
		// 					},
		// 					{
		// 						id: 'c106',
		// 						title: 'Build app header',
		// 						archivedAt: null,
		// 						labelIds: ['l103'],
		// 						dueDate: 1674664581,
		// 						byMember: {
		// 							_id: 'u103',
		// 							username: 'Dror',
		// 							fullname: 'Dror K',
		// 							imgUrl: 'http://dror-img',
		// 						},
		// 						style: {
		// 							bgColor: '#ffaf3f',
		// 						},
		// 					},
		// 				],
		// 			},
		// 			{
		// 				id: 'g104',
		// 				title: 'QA',
		// 				tasks: [
		// 					{
		// 						id: 'c107',
		// 						title: 'Database implementation',
		// 						archivedAt: null,
		// 						labelIds: ['l105'],
		// 						dueDate: 1674837381,
		// 						byMember: {
		// 							_id: 'u103',
		// 							username: 'Dror',
		// 							fullname: 'Dror K',
		// 							imgUrl: 'http://dror-img',
		// 						},
		// 						memberIds: ['u101'],
		// 					},
		// 					{
		// 						id: 'c108',
		// 						title: 'PWA',
		// 						description: 'description',
		// 						archivedAt: null,
		// 						labelIds: ['l101', 'l104'],
		// 						dueDate: 1675010181,
		// 						byMember: {
		// 							_id: 'u103',
		// 							username: 'Dror',
		// 							fullname: 'Dror K',
		// 							imgUrl: 'http://dror-img',
		// 						},
		// 						memberIds: ['u102', 'u103'],
		// 						attachments: ['http://img-attached1'],
		// 					},
		// 				],
		// 			},
		// 			{
		// 				id: 'g105',
		// 				title: 'Done',
		// 				tasks: [
		// 					{
		// 						id: 'c109',
		// 						title: 'Login system',
		// 						archivedAt: null,
		// 						labelIds: ['l101', 'l103'],
		// 						dueDate: 1674146181,
		// 						byMember: {
		// 							_id: 'u103',
		// 							username: 'Dror',
		// 							fullname: 'Dror K',
		// 							imgUrl: 'http://dror-img',
		// 						},
		// 						memberIds: ['u102', 'u103'],
		// 						style: {
		// 							bgColor: '#29cce5',
		// 						},
		// 					},
		// 					{
		// 						id: 'c110',
		// 						title: 'Add node.js modules',
		// 						archivedAt: null,
		// 						labelIds: ['l101', 'l104'],
		// 						dueDate: 1675010181,
		// 						byMember: {
		// 							_id: 'u103',
		// 							username: 'Dror',
		// 							fullname: 'Dror K',
		// 							imgUrl: 'http://dror-img',
		// 						},
		// 						memberIds: ['u101', 'u102', 'u103'],
		// 						attachments: ['http://img-attached2'],
		// 						checklists: [
		// 							{
		// 								id: 'cl102',
		// 								title: 'Checklist1',
		// 								todos: [
		// 									{
		// 										id: 'td104',
		// 										title: 'item in checklist 1',
		// 										isDone: true,
		// 									},
		// 									{
		// 										id: 'td105',
		// 										title: 'another item in checklist 1',
		// 										isDone: true,
		// 									},
		// 								],
		// 							},
		// 							{
		// 								id: 'cl103',
		// 								title: 'Checklist2',
		// 								todos: [
		// 									{
		// 										id: 'td104',
		// 										title: 'item in checklist 2',
		// 										isDone: true,
		// 									},
		// 								],
		// 							},
		// 						],
		// 					},
		// 				],
		// 			},
		// 			{
		// 				id: 'g106',
		// 				title: 'Ready for production',
		// 				tasks: [],
		// 			},
		// 		],
		// 	},
		// 	{
		// 		_id: 'b102',
		// 		title: 'Stam board',
		// 		isStarred: false,
		// 		archivedAt: null,
		// 		createdBy: {},
		// 		style: {},
		// 		labels: [],
		// 		members: [],
		// 		groups: [],
		// 	},
		// 	{
		// 		_id: 'b103',
		// 		title: 'Yalla',
		// 		isStarred: false,
		// 		archivedAt: null,
		// 		createdBy: {},
		// 		style: {},
		// 		labels: [],
		// 		members: [],
		// 		groups: [],
		// 	},
		// ]
		utilService.saveToStorage(STORAGE_KEY, boards)
	}
}

// * group service
async function queryGroups(boardId) {
	try {
		let board = await getById(boardId)
		let groups = board.groups
		return groups
	} catch (err) {
		console.log('Failed to get groups', err)
		throw err
	}
}

async function getGroupById(groupId, boardId) {
	try {
		const groups = await queryGroups(boardId)
		const group = groups.find((grp) => {
			return grp.id === groupId
		})
		return group
	} catch (err) {
		console.log('Failed to get group', err)
		throw err
	}
}

async function removeGroup(groupId, boardId) {
	try {
		let board = await getById(boardId)
		const updatedGroups = board.groups.filter((group) => group.id !== groupId)
		board.groups = updatedGroups
		return save(board)
	} catch (err) {
		console.log('Failed to remove group', err)
		throw err
	}
}

async function saveGroup(group, boardId) {
	try {
		let board = await getById(boardId)
		if (group.id) {
			const idx = board.groups.findIndex(
				(currGroup) => currGroup.id === group.id
			)
			if (idx < 0)
				throw new Error(`Update failed, cannot find group with id: ${group.id}`)
			board.groups.splice(idx, 1, group)
		} else {
			group.id = utilService.makeId()
			board.groups.push(group)
		}
		console.log('Saved group in boardService', 'group:', group, 'board:', board)
		return save(board)
	} catch (err) {
		console.log('Failed to save group', err)
		throw err
	}
}

function getEmptyGroup() {
	return {
		title: '',
		tasks: [],
	}
}

// * tasks service
async function queryTasks(groupId, boardId) {
	try {
		let group = await getGroupById(groupId, boardId)
		let tasks = group.tasks
		return tasks
	} catch (err) {
		console.log('Failed to get tasks', err)
		throw err
	}
}

async function getTaskById(taskId, groupId, boardId) {
	try {
		const tasks = await queryTasks(groupId, boardId)
		const task = tasks.find((task) => task.id === taskId)
		return task
	} catch (err) {
		console.log('Failed to get task', err)
		throw err
	}
}

async function removeTask(taskId, groupId, boardId) {
	try {
		let group = await getGroupById(groupId, boardId)
		console.log('group before', group)
		let updatedTasks = group.tasks.filter((task) => task.id !== taskId)
		group.tasks = updatedTasks
		console.log('group after', group)
		return await saveGroup(group, boardId)
	} catch (err) {
		console.log('Failed to remove task', err)
		throw err
	}
}

async function saveTask(task, groupId, boardId) {
	try {
		let group = await getGroupById(groupId, boardId)
		if (task.id) {
			const idx = group.tasks.findIndex((currTask) => currTask.id === task.id)
			if (idx < 0)
				throw new Error(`Update failed, cannot find task with id: ${task.id}`)
			group.tasks.splice(idx, 1, task)
		} else {
			task.id = utilService.makeId()
			group.tasks.push(task)
		}
		console.log('saveGroup in boarService', 'group:', group, 'boardId:', boardId);
		return await saveGroup(group, boardId)
	} catch (err) {
		console.log('Failed to save group', err)
		throw err
	}
}

function getEmptyTask() {
	return {
		title: '',
		archivedAt: null,
		labelIds: [],
		dueDate: 1674837381,
		byMember: {
			_id: '',
			username: '',
			fullname: '',
			imgUrl: '',
		},
		memberIds: [],
		comments: [],
		style: {},
		attachments: [],
		checklists: [],
	}
}
