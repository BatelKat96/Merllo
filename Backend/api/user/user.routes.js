const express = require('express')
const {
	requireAuth,
	requireAdmin,
} = require('../../middlewares/requireAuth.middleware')
const {
	getUser,
	getUsers,
	deleteUser,
	updateUser,
} = require('./user.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)
// * without auth
router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/:id', updateUser)

// * with auth
// router.get('/', getUsers)
// router.get('/:id', getUser)
// router.put('/:id', requireAuth,  updateUser)

module.exports = router
