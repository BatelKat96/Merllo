import axios from 'axios'

export const unsplashService = {
	getPhotos,
}

// * for dev purposes
const hardCodedPhotos = [
	{
		backgroundColor: '#f3f3f3',
		background:
			'https://images.unsplash.com/photo-1671611138407-f8ef6f1b7b13?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1671611138407-f8ef6f1b7b13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#0c2626',
		background:
			'https://images.unsplash.com/photo-1671630880761-10ce72f8bd5f?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1671630880761-10ce72f8bd5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#f3f3f3',
		background:
			'https://images.unsplash.com/photo-1672162724304-866bd48a3d6f?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1672162724304-866bd48a3d6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#f3f3f3',
		background:
			'https://images.unsplash.com/photo-1672172633490-0e4280e54ab3?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1672172633490-0e4280e54ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#a68c73',
		background:
			'https://images.unsplash.com/photo-1672184158656-225643b8e57e?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1672184158656-225643b8e57e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#262626',
		background:
			'https://images.unsplash.com/photo-1672262077289-19440458713e?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1672262077289-19440458713e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#0c260c',
		background:
			'https://images.unsplash.com/photo-1672370751865-7f904be99287?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1672370751865-7f904be99287?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#262626',
		background:
			'https://images.unsplash.com/photo-1672392758425-8fbcecd35694?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1672392758425-8fbcecd35694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#d9d9d9',
		background:
			'https://images.unsplash.com/photo-1672472249806-e3f4bc3eac6d?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1672472249806-e3f4bc3eac6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#f3d9d9',
		background:
			'https://images.unsplash.com/photo-1672548817192-bce4d238b816?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1672548817192-bce4d238b816?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#f3f3f3',
		background:
			'https://images.unsplash.com/photo-1672556678462-4bf317568359?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1672556678462-4bf317568359?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#f3f3f3',
		background:
			'https://images.unsplash.com/photo-1672676048356-2ee34abaafa7?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1672676048356-2ee34abaafa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#595959',
		background:
			'https://images.unsplash.com/photo-1672676515299-3a378e32463e?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1672676515299-3a378e32463e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#260c0c',
		background:
			'https://images.unsplash.com/photo-1672860647219-d624a4bf5d06?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1672860647219-d624a4bf5d06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#0c2640',
		background:
			'https://images.unsplash.com/photo-1672913404066-2dd7a44d96ae?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1672913404066-2dd7a44d96ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#d9c073',
		background:
			'https://images.unsplash.com/photo-1673011354655-ed75c156294d?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1673011354655-ed75c156294d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#73a6c0',
		background:
			'https://images.unsplash.com/photo-1673017987376-cfb1f3936227?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1673017987376-cfb1f3936227?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#262626',
		background:
			'https://images.unsplash.com/photo-1673082797735-f994d6120ded?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1673082797735-f994d6120ded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#73a6c0',
		background:
			'https://images.unsplash.com/photo-1673361806077-f0ce855d5e95?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1673361806077-f0ce855d5e95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#0c2626',
		background:
			'https://images.unsplash.com/photo-1673585454098-fa925218813b?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1673585454098-fa925218813b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#f3f3f3',
		background:
			'https://images.unsplash.com/photo-1673645168433-75708104f75f?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1673645168433-75708104f75f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#264040',
		background:
			'https://images.unsplash.com/photo-1673712277551-ea12f7a11a71?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1673712277551-ea12f7a11a71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#262626',
		background:
			'https://images.unsplash.com/photo-1673786427492-960fc4a0c1b9?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1673786427492-960fc4a0c1b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#260c0c',
		background:
			'https://images.unsplash.com/photo-1673993443693-181cf58b7e2c?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1673993443693-181cf58b7e2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#26260c',
		background:
			'https://images.unsplash.com/photo-1674075872359-a174bc7ed420?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1674075872359-a174bc7ed420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#f3f3f3',
		background:
			'https://images.unsplash.com/photo-1674130070695-82aefa76ca67?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1674130070695-82aefa76ca67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#d9d9d9',
		background:
			'https://images.unsplash.com/photo-1674131155371-7263c03cae98?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1674131155371-7263c03cae98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#262626',
		background:
			'https://images.unsplash.com/photo-1674318600272-06511075bcbc?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1674318600272-06511075bcbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#595959',
		background:
			'https://images.unsplash.com/photo-1674407729043-c21b71fded37?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1674407729043-c21b71fded37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
	{
		backgroundColor: '#d9d9f3',
		background:
			'https://images.unsplash.com/photo-1674479568785-a67c76e566c8?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80',
		thumbnail:
			'https://images.unsplash.com/photo-1674479568785-a67c76e566c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1OTM5NzI&ixlib=rb-4.0.3&q=80&w=400',
	},
]

const STORAGE_KEY = 'photos'
const photos = _loadFromStorage(STORAGE_KEY) || null
const API_KEY = 'JRY734h_KdVD-02lIwlrBk6TQnUCv29JyIqGjCYYVrE'

async function getPhotos(searchTxt) {
	// * for dev purposes
	return hardCodedPhotos

	// * real function
	if (!searchTxt && photos) return photos
	let URL = `https://api.unsplash.com/photos/random?count=30${
		searchTxt ? `&query=${searchTxt}` : ''
	}&client_id=${API_KEY}`

	try {
		const response = await axios.get(URL)
		const { data } = response
		const photos = data.map((photo) => ({
			backgroundColor: photo.color,
			background: photo.urls.full,
			thumbnail: photo.urls.small,
		}))
		_saveToStorage(STORAGE_KEY, photos)
		console.log(photos)
		return photos
	} catch (err) {
		console.error('ERROR in getting photos!', err)
	}
}

function _saveToStorage(key, val) {
	localStorage.setItem(key, JSON.stringify(val))
}

function _loadFromStorage(key) {
	var val = localStorage.getItem(key)
	return JSON.parse(val)
}
