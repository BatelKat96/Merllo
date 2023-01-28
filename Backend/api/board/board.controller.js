const boardService = require('./board.service.js')
const logger = require('../../services/logger.service')
const { broadcast } = require('../../services/socket.service.js')
const asyncLocalStorage = require('../../services/als.service.js')
const utilService = require('../../services/util.service.js')

async function getBoards(req, res) {
	try {
		logger.debug('Getting Boards')
		const filterBy = {
			txt: req.query.txt || '',
		}
		const boards = await boardService.query()
		res.json(boards)
	} catch (err) {
		logger.error('Failed to get boards', err)
		res.status(500).send({ err: 'Failed to get boards' })
	}
}

async function getBoardById(req, res) {
	try {
		const boardId = req.params.id
		const board = await boardService.getById(boardId)
		res.json(board)
	} catch (err) {
		logger.error('Failed to get board', err)
		res.status(500).send({ err: 'Failed to get board' })
	}
}

async function addBoard(req, res) {
	const { loggedinUser } = req
	console.log('req.body', req.body)

	try {
		const board = req.body
		// board.createdBy = loggedinUser
		const addedBoard = await boardService.add(board)
		console.log('addedBoard', addedBoard)
		res.json(addedBoard)
	} catch (err) {
		logger.error('Failed to add board', err)
		res.status(500).send({ err: 'Failed to add board' })
	}
}

async function updateBoard(req, res) {
	try {
		const board = req.body
		const updatedBoard = await boardService.update(board)
		const loggedinUser = asyncLocalStorage.getStore().loggedinUser || {
			_id: utilService.makeId(),
		}

		broadcast({
			type: 'update-board',
			data: updatedBoard,
			room: updatedBoard._id,
			userId: loggedinUser?._id,
		})
		res.json(updatedBoard)
	} catch (err) {
		logger.error('Failed to update board', err)
		res.status(500).send({ err: 'Failed to update board' })
	}
}

async function removeBoard(req, res) {
	try {
		const boardId = req.params.id
		const removedId = await boardService.remove(boardId)
		res.send(removedId)
	} catch (err) {
		logger.error('Failed to remove board', err)
		res.status(500).send({ err: 'Failed to remove board' })
	}
}

// async function addBoardMsg(req, res) {
// 	const { loggedinUser } = req
// 	try {
// 		const boardId = req.params.id
// 		const msg = {
// 			txt: req.body.txt,
// 			by: loggedinUser,
// 		}
// 		const savedMsg = await boardService.addBoardMsg(boardId, msg)
// 		res.json(savedMsg)
// 	} catch (err) {
// 		logger.error('Failed to update board', err)
// 		res.status(500).send({ err: 'Failed to update board' })
// 	}
// }

// async function removeBoardMsg(req, res) {
// 	const { loggedinUser } = req
// 	try {
// 		const boardId = req.params.id
// 		const { msgId } = req.params

// 		const removedId = await boardService.removeBoardMsg(boardId, msgId)
// 		res.send(removedId)
// 	} catch (err) {
// 		logger.error('Failed to remove board msg', err)
// 		res.status(500).send({ err: 'Failed to remove board msg' })
// 	}
// }

module.exports = {
	getBoards,
	getBoardById,
	addBoard,
	updateBoard,
	removeBoard,
}
