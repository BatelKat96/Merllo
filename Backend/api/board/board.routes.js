const express = require('express')
const {
	requireAuth,
	requireAdmin,
} = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const {
	getBoards,
	getBoardById,
	addBoard,
	updateBoard,
	removeBoard,
	addBoardMsg,
	removeBoardMsg,
} = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)
// * without auth
router.get('/', log, getBoards)
router.get('/:id', getBoardById)
router.post('/', addBoard)
router.put('/:id', updateBoard)
router.delete('/:id', removeBoard)

// * with auth
// router.get('/', log, getBoards)
// router.get('/:id', getBoardById)
// router.post('/', requireAuth, addBoard)
// router.put('/:id', requireAuth, updateBoard)
// router.delete('/:id', requireAuth, removeBoard)

router.post('/:id/msg', requireAuth, addBoardMsg)
router.delete('/:id/msg/:msgId', requireAuth, removeBoardMsg)

module.exports = router
