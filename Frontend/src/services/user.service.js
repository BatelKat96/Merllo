// import { storageService } from './async-storage.service'
import { httpService } from './http.service'

import usersData from '../data/users-data.json'
import { utilService } from './util.service'

const STORAGE_KEY_USERS = 'user'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
	login,
	logout,
	signup,
	getLoggedinUser,
	saveLocalUser,
	getUsers,
	getById,
	remove,
	update,
}

window.userService = userService

_createUsers()

function getUsers() {
	console.log('user service getUsers')
	return httpService.get(`user`)
	// return storageService.query('user')
}

async function getById(userId) {
	console.log('user service getById', userId)
	const user = await httpService.get(`user/${userId}`)
	// const user = await storageService.get('user', userId)
	return user
}

function remove(userId) {
	console.log('user service remove', userId)
	return httpService.delete(`user/${userId}`)
	// return storageService.remove('user', userId)
}

async function update({ _id, score }) {
	console.log('user service update _id, score', _id, score)
	// const user = await storageService.get('user', _id)
	// await storageService.put('user', user)

	const user = await httpService.put(`user/${_id}`, { _id, score })
	// Handle case in which admin updates other user's details
	if (getLoggedinUser()._id === user._id) saveLocalUser(user)
	return user
}

async function login(userCred) {
	console.log('user service login', userCred)
	try {
		// const users = await storageService.query('user')
		// console.log('users', users)
		// const user = users.find((user) => user.username === userCred.username)
		// console.log('user', user)
		const user = await httpService.post('auth/login', userCred)
		if (user) {
			// socketService.login(user._id)
			return saveLocalUser(user)
		} else {
			console.log('else')
			throw new Error('Cannot login - No such user!')
		}
	} catch (err) {
		console.log('no such user')
		throw new Error(err)
	}
}

async function signup(userCred) {
	console.log('user service signup', userCred)
	if (!userCred.imgUrl)
		userCred.imgUrl =
			'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'

	const user = await httpService.post('auth/signup', userCred)
	// const user = await storageService.post('user', userCred)
	// socketService.login(user._id)
	return saveLocalUser(user)
}

async function logout() {
	console.log('user service logout')
	try {
		await httpService.post('auth/logout')
		sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
	} catch (err) {
		console.log('service logout error', err)
	}
	// socketService.logout()
}

function saveLocalUser(user) {
	user = {
		_id: user._id,
		fullname: user.fullname,
		imgUrl: user.imgUrl,
		username: user.username,
	}
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
	return user
}

function getLoggedinUser() {
	return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function _createUsers() {
	let users = utilService.loadFromStorage(STORAGE_KEY_USERS)
	if (!users) {
		users = usersData
		utilService.saveToStorage(STORAGE_KEY_USERS, users)
	}
}

// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()
