import { useEffect, useState } from 'react'
import { unsplashService } from '../services/unsplash.service'
import Loader from '../assets/img/loader.svg'
import { AiOutlineSearch } from 'react-icons/ai'

export const SideMenuPhotos = ({ changeBackground }) => {
	const [photos, setPhotos] = useState(null)
	const [search, setSearch] = useState('')

	const getPhotos = async () => {
		try {
			const photos = await unsplashService.getPhotos()
			setPhotos(photos)
		} catch (err) {
			console.log('Failed to get photos')
		}
	}

	useEffect(() => {
		getPhotos()
	}, [])
	console.log('photos', photos)

	const onSearchPhotos = (ev) => {
		ev.preventDefault()
		if (!search) return
		setPhotos(null)
		getPhotos(search)
	}

	const handleChange = ({ target }) => {
		setSearch(target.value)
	}

	return (
		<section className="side-menu-photos">
			<form onSubmit={onSearchPhotos}>
				<div className="input-holder">
					<input
						placeholder="Photos"
						type="text"
						className="input"
						value={search}
						onChange={handleChange}
					/>
					<AiOutlineSearch className="icon" />
				</div>
			</form>
			{photos ? (
				<div className="photo-list-wrapper">
					<ul className="clean-list photo-list">
						{photos.map((photo) => (
							<li
								key={photo.background}
								className="display hover-darker"
								style={{
									background: `url('${photo.thumbnail}') center center / cover`,
								}}
								onClick={() => changeBackground(photo)}
							></li>
						))}
					</ul>
				</div>
			) : (
				<img className="loader" src={Loader} alt="loader" />
			)}
		</section>
	)
}
