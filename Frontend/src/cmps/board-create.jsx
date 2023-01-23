import { useEffect, useState } from 'react'
import { addBoard } from '../store/board.actions'
import { boardService } from '../services/board.service'
import { unsplashService } from '../services/unsplash.service'

import { IoClose } from 'react-icons/io5'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function BoardCreate({ closeBoardComposer }) {
	const board = useSelector((storeState) => storeState.boardModule.board)
	const boards = useSelector((storeState) => storeState.boardModule.boards)
	const [boardToEdit, setBoardToEdit] = useState(boardService.getEmptyBoard())
	const navigate = useNavigate()

	const bgImgs = [
		{
			backgroundColor: '#d9d9d9',
			background:
				'https://images.unsplash.com/photo-1672091161606-71d1cf383221?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ0Njg0MzQ&ixlib=rb-4.0.3&q=80',
			thumbnail:
				'https://images.unsplash.com/photo-1672091161606-71d1cf383221?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ0Njg0MzQ&ixlib=rb-4.0.3&q=80&w=400',
		},
		{
			backgroundColor: '#262626',
			background:
				'https://images.unsplash.com/photo-1672167630747-35dd70a83994?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ0Njg0MzQ&ixlib=rb-4.0.3&q=80',
			thumbnail:
				'https://images.unsplash.com/photo-1672167630747-35dd70a83994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ0Njg0MzQ&ixlib=rb-4.0.3&q=80&w=400',
		},
		{
			backgroundColor: '#f3f3d9',
			background:
				'https://images.unsplash.com/photo-1673212815770-16f0a1f1500f?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ0Njg0MzQ&ixlib=rb-4.0.3&q=80',
			thumbnail:
				'https://images.unsplash.com/photo-1673212815770-16f0a1f1500f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ0Njg0MzQ&ixlib=rb-4.0.3&q=80&w=400',
		},
		{
			backgroundColor: '#d9d9d9',
			background:
				'https://images.unsplash.com/photo-1673725437336-e2f3307cebbf?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ0Njg0MzQ&ixlib=rb-4.0.3&q=80',
			thumbnail:
				'https://images.unsplash.com/photo-1673725437336-e2f3307cebbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ0Njg0MzQ&ixlib=rb-4.0.3&q=80&w=400',
		},
	]

	const bgClrs = [
		'#0079bf',
		'#d29034',
		'#519839',
		'#b04632',
		'#89609e',
		'#cd5a91',
	]

	const [backgroundColor, setBackgroundColor] = useState('')
	const [backgroundImage, setBackgroundImage] = useState(bgImgs[0].thumbnail)

	function handleNewBoard({ target }) {
		let { value, name: field } = target
		setBoardToEdit((prevBoard) => ({ ...prevBoard, [field]: value }))
	}

	const setBoardBackground = (backgroundColor, backgroundImage) => {
		console.log('setBoardBackground: backgroundImage', backgroundImage)
		setBackgroundColor(backgroundColor)
		setBackgroundImage(backgroundImage)
		let style = backgroundImage
			? bgImgs.find((bgImg) => bgImg.thumbnail === backgroundImage)
			: { backgroundColor }
		setBoardToEdit((prevBoard) => ({ ...prevBoard, style }))
		console.log('setBoardBackground: boardToEdit', boardToEdit)
	}

	async function onCreateBoard(ev) {
		ev.preventDefault()
		if (!boardToEdit.title) return
		console.log('onCreateBoard: boardToEdit', boardToEdit)
		try {
			const newBoard = await addBoard(boardToEdit)
			closeBoardComposer()
			setBoardToEdit(boardService.getEmptyBoard())
			console.log('new board success!')
			navigate(`/board/${newBoard._id}`)
		} catch (err) {
			console.log('Failed to save new board', err)
		}
	}

	return (
		<section className="create-board-composer">
			<div className="create-board-composer-header">
				<h2>Create board</h2>
				<button
					className="btn-board-composer close"
					onClick={closeBoardComposer}
				>
					<IoClose className="icon-close" />
				</button>
			</div>

			<div className="create-board-bg-picker">
				<label className="create-board-label">Background</label>
				<div className="bg-img-picker">
					<ul className="clean-list bg-imgs-list">
						{bgImgs.map((bgImg) => (
							<li key={bgImg.thumbnail} className="li-bg-img">
								<button
									className="btn-bg bg-img"
									title="Custom image"
									onClick={() => setBoardBackground(undefined, bgImg.thumbnail)}
									style={{ backgroundImage: 'url(' + bgImg.thumbnail + ')' }}
								>
									<span className="bg-preview-fade"></span>
								</button>
							</li>
						))}
					</ul>
				</div>

				<div className="bg-clr-picker">
					<ul className="clean-list bg-clrs-list">
						{bgClrs.map((bgClr) => (
							<li key={bgClr} className="li-bg-clr">
								<button
									className="btn-bg bg-img"
									onClick={() => setBoardBackground(bgClr, undefined)}
									style={{ backgroundColor: bgClr }}
								>
									<span className="bg-preview-fade"></span>
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>

			<form>
				<label className="create-board-label">Board title</label>
				<input
					type="text"
					name="title"
					maxLength="512"
					value={boardToEdit.title}
					onChange={handleNewBoard}
				/>
				<button className="btn-board-composer create" onClick={onCreateBoard}>
					Create
				</button>
			</form>

			{/* <div className="photos-unsplash">
				<p>Photos</p>
				{photos && (
					<section className="photo-list">
						<ul className="clean-list">
							{photos.map((photo) => (
								<li
									key={photo.background}
									className="photo-unsplash"
									style={{
										background: `url('${photo.thumbnail}') center center / cover`,
									}}
								></li>
							))}
						</ul>
					</section>
				)}
			</div> */}
		</section>
	)
}
