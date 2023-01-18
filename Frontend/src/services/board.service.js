import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'board'
// const STORAGE_GROUPS_KEY = 'group'

export const boardService = {
	query,
	getById,
	save,
	remove,
	getEmptyBoard,
	queryGroup,
	getGroupById,
	saveGroup,
	removeGroup,
	getEmptyGroup,
}
window.cs = boardService

_createBoards()

// * board functions
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
		// board.owner = userService.getLoggedinUser()
		savedBoard = await storageService.post(STORAGE_KEY, board)
		// savedBoard = await httpService.post('board', board)
	}
	return savedBoard
}

function getEmptyBoard() {
	return {
		title: 'New board',
		isStarred: false,
		archivedAt: null,
		createdBy: {},
		style: {},
		labels: [],
		members: [],
		groups: [],
	}
}

function _createBoards() {
	let boards = utilService.loadFromStorage(STORAGE_KEY)
	if (!boards) {
		boards = [
			{
				_id: 'b101',
				title: 'Demo',
				isStarred: true,
				archivedAt: null,
				createdBy: {
					_id: 'u101',
					fullname: 'Batel K',
					imgUrl: 'http://batel-img',
				},
				style: {},
				labels: [
					{
						id: 'l101',
						title: 'UI',
						color: '#d6ecd2',
					},
					{
						id: 'l102',
						title: 'Low priority',
						color: '#faf3c0',
					},
					{
						id: 'l103',
						title: 'Medium priority',
						color: '#fce6c6',
					},
					{
						id: 'l104',
						title: 'High priority',
						color: '#f5d3ce',
					},
					{
						id: 'l105',
						title: 'Bug',
						color: '#eddbf4',
					},
				],
				members: [
					{
						_id: 'u101',
						fullname: 'Batel K',
						imgUrl: 'http://batel-img',
					},
					{
						_id: 'u102',
						fullname: 'Beta S',
						imgUrl: 'http://beta-img',
					},
					{
						_id: 'u103',
						fullname: 'Dror K',
						imgUrl: 'http://dror-img',
					},
				],
				groups: [
					{
						id: 'g101',
						title: 'Backlog-client',
						tasks: [
							{
								id: 'c101',
								title: 'Basic CRUDL',
								archivedAt: null,
								labelIds: ['l104'],
								dueDate: 1674837381,
								byMember: {
									_id: 'u103',
									username: 'Dror',
									fullname: 'Dror K',
									imgUrl: 'http://dror-img',
								},
								comments: [
									{
										id: 'cm101',
										txt: 'this is a comment',
										createdAt: 1673973381,
										byMember: {
											_id: 'u103',
											fullname: 'Dror K',
											imgUrl: 'http://dror-img',
										},
									},
								],
							},
							{
								id: 'c102',
								title: 'Build app footer',
								description: 'description',
								archivedAt: null,
								labelIds: ['l103'],
								dueDate: 1674664581,
								byMember: {
									_id: 'u103',
									username: 'Dror',
									fullname: 'Dror K',
									imgUrl: 'http://dror-img',
								},
								style: {
									bgColor: '#7bc86c',
								},
							},
						],
					},
					{
						id: 'g102',
						title: 'Backlog-server',
						tasks: [
							{
								id: 'c103',
								title: 'User authentication',
								archivedAt: null,
								labelIds: ['l101', 'l103'],
								dueDate: 1674491781,
								byMember: {
									_id: 'u103',
									username: 'Dror',
									fullname: 'Dror K',
									imgUrl: 'http://dror-img',
								},
								style: {
									bgColor: '#29cce5',
								},
							},
							{
								id: 'c104',
								title: 'Create services',
								archivedAt: null,
								labelIds: ['l102'],
								dueDate: 1674578181,
								byMember: {
									_id: 'u103',
									username: 'Dror',
									fullname: 'Dror K',
									imgUrl: 'http://dror-img',
								},
								checklists: [
									{
										id: 'cl101',
										title: 'Checklist',
										todos: [
											{
												id: 'td101',
												title: 'Board',
												isDone: false,
											},
											{
												id: 'td102',
												title: 'User',
												isDone: false,
											},
											{
												id: 'td103',
												title: 'Task',
												isDone: false,
											},
										],
									},
								],
							},
						],
					},
					{
						id: 'g103',
						title: 'In development',
						tasks: [
							{
								id: 'c105',
								title: 'Support sockets',
								archivedAt: null,
								labelIds: ['l103'],
								dueDate: 1674664581,
								byMember: {
									_id: 'u103',
									username: 'Dror',
									fullname: 'Dror K',
									imgUrl: 'http://dror-img',
								},
								memberIds: ['u101', 'u103'],
							},
							{
								id: 'c106',
								title: 'Build app header',
								archivedAt: null,
								labelIds: ['l103'],
								dueDate: 1674664581,
								byMember: {
									_id: 'u103',
									username: 'Dror',
									fullname: 'Dror K',
									imgUrl: 'http://dror-img',
								},
								style: {
									bgColor: '#ffaf3f',
								},
							},
						],
					},
					{
						id: 'g104',
						title: 'QA',
						tasks: [
							{
								id: 'c107',
								title: 'Database implementation',
								archivedAt: null,
								labelIds: ['l105'],
								dueDate: 1674837381,
								byMember: {
									_id: 'u103',
									username: 'Dror',
									fullname: 'Dror K',
									imgUrl: 'http://dror-img',
								},
								memberIds: ['u101'],
							},
							{
								id: 'c108',
								title: 'PWA',
								description: 'description',
								archivedAt: null,
								labelIds: ['l101', 'l104'],
								dueDate: 1675010181,
								byMember: {
									_id: 'u103',
									username: 'Dror',
									fullname: 'Dror K',
									imgUrl: 'http://dror-img',
								},
								memberIds: ['u102', 'u103'],
								attachments: ['http://img-attached1'],
							},
						],
					},
					{
						id: 'g105',
						title: 'Done',
						tasks: [
							{
								id: 'c109',
								title: 'Login system',
								archivedAt: null,
								labelIds: ['l101', 'l103'],
								dueDate: 1674146181,
								byMember: {
									_id: 'u103',
									username: 'Dror',
									fullname: 'Dror K',
									imgUrl: 'http://dror-img',
								},
								memberIds: ['u102', 'u103'],
								style: {
									bgColor: '#29cce5',
								},
							},
							{
								id: 'c110',
								title: 'Add node.js modules',
								archivedAt: null,
								labelIds: ['l101', 'l104'],
								dueDate: 1675010181,
								byMember: {
									_id: 'u103',
									username: 'Dror',
									fullname: 'Dror K',
									imgUrl: 'http://dror-img',
								},
								memberIds: ['u101', 'u102', 'u103'],
								attachments: ['http://img-attached2'],
								checklists: [
									{
										id: 'cl102',
										title: 'Checklist1',
										todos: [
											{
												id: 'td104',
												title: 'item in checklist 1',
												isDone: true,
											},
											{
												id: 'td105',
												title: 'another item in checklist 1',
												isDone: true,
											},
										],
									},
									{
										id: 'cl103',
										title: 'Checklist2',
										todos: [
											{
												id: 'td104',
												title: 'item in checklist 2',
												isDone: true,
											},
										],
									},
								],
							},
						],
					},
					{
						id: 'g106',
						title: 'Ready for production',
						tasks: [],
					},
				],
			},
		]
		utilService.saveToStorage(STORAGE_KEY, boards)
	}
}

// * group functions
async function queryGroup(boardId) {
	let board = await getById(boardId)
	let groups = board.groups
	// here we will add filters
	return groups
}

async function getGroupById(groupId) {
	return await storageService.get(STORAGE_KEY, groupId)
}

async function removeGroup(groupId) {
	await storageService.remove(STORAGE_KEY, groupId)
}
async function saveGroup(group) {
	var savedGroup
	if (group._id) {
		savedGroup = await storageService.put(STORAGE_KEY, group)
	} else {
		// Later, owner is set by the backend
		// board.owner = userService.getLoggedinUser()
		savedGroup = await storageService.post(STORAGE_KEY, group)
	}
	return savedGroup
}

function getEmptyGroup() {
	return {
		title: 'New group',
		tasks: [],
	}
}
