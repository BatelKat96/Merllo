import { boardService } from '../services/board.service'
import { store } from './store.js'

import {
	SET_BOARDS,
	SET_BOARD,
	ADD_BOARD,
	REMOVE_BOARD,
} from './board.reducer.js'

// Action Creators:
export function getActionRemoveBoard(boardId) {
	return {
		type: REMOVE_BOARD,
		boardId,
	}
}

export function getActionAddBoard(board) {
	return {
		type: ADD_BOARD,
		board,
	}
}

export function getActionUpdateBoard(board) {
	return {
		type: SET_BOARD,
		board,
	}
}

// * board actions (some to be used in the future)
export async function loadBoards() {
	try {
		const boards = await boardService.query()
		store.dispatch({
			type: SET_BOARDS,
			boards,
		})
	} catch (err) {
		console.log('Cannot load boards', err)
		throw err
	}
}

export async function removeBoard(boardId) {
	try {
		await boardService.remove(boardId)
		store.dispatch(getActionRemoveBoard(boardId))
	} catch (err) {
		console.log('Cannot remove board', err)
		throw err
	}
}

export async function addBoard(board) {
	try {
		const savedBoard = await boardService.save(board)
		store.dispatch(getActionAddBoard(savedBoard))
		return savedBoard
	} catch (err) {
		console.log('Cannot add board', err)
		throw err
	}
}

export async function updateBoard(board) {
	try {
		store.dispatch(getActionUpdateBoard(board))
		await boardService.save(board)
		// const savedBoard = await boardService.save(board)
		// return savedBoard
	} catch (err) {
		console.log('Cannot save board', err)
		throw err
	}
}

export async function loadBoard(boardId) {
	try {
		const board = await boardService.getById(boardId)
		store.dispatch({
			type: SET_BOARD,
			board,
		})
		return board
	} catch (err) {
		console.log('board cmp - failed to load board', err)
		throw err
	}
}

// * group actions
export async function removeGroup(groupId, boardId) {
	try {
		let savedBoard = await boardService.removeGroup(groupId, boardId)
		store.dispatch(getActionUpdateBoard(savedBoard))
		return groupId
	} catch (err) {
		console.log('Cannot remove group', err)
		throw err
	}
}

export async function saveGroup(group, boardId) {
	try {
		const savedBoard = await boardService.saveGroup(group, boardId)
		store.dispatch(getActionUpdateBoard(savedBoard))
		return group
	} catch (err) {
		console.log('Cannot save group', err)
		throw err
	}
}

// * task actions
export async function removeTask(taskId, groupId, boardId) {
	try {
		let savedBoard = await boardService.removeTask(taskId, groupId, boardId)
		store.dispatch(getActionUpdateBoard(savedBoard))
		return taskId
	} catch (err) {
		console.log('Cannot remove task', err)
		throw err
	}
}

export async function saveTask(task, groupId, boardId) {
	try {
		let updateboard = await boardService.getById(boardId)
		store.dispatch(getActionUpdateBoard(updateboard))
		const savedBoard = await boardService.saveTask(task, groupId, boardId)
		// const savedBoard = await boardService.saveTask(task, groupId, boardId)
		// store.dispatch(getActionUpdateBoard(savedBoard))
		return task
	} catch (err) {
		console.log('Cannot save task', err)
		throw err
	}
}
