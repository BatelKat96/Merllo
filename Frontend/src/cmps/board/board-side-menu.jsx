import { Fragment, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'
import { SideMenuBgOptions } from './side-menu-bg-options'
import { SideMenuColors } from './side-menu-colors'
import { SideMenuMain } from './side-menu-main'
import { SideMenuPhotos } from './side-menu-photos'

export function BoardSideMenu({
	onToggleSideMenu,
	changeBackground,
	onRemoveBoard,
}) {
	const [title, setTitle] = useState('Menu')

	function onChangeTitle(title) {
		setTitle(title)
	}

	function getCmp() {
		switch (title) {
			case 'Menu':
				return (
					<SideMenuMain
						onChangeTitle={onChangeTitle}
						onRemoveBoard={onRemoveBoard}
					/>
				)
			case 'Change background':
				return <SideMenuBgOptions onChangeTitle={onChangeTitle} />
			case 'Colors':
				return <SideMenuColors changeBackground={changeBackground} />
			case 'Photos by':
				return <SideMenuPhotos changeBackground={changeBackground} />
			default:
				return <section></section>
		}
	}

	function onGoBack() {
		switch (title) {
			case 'Change background':
				setTitle('Menu')
				break
			case 'Colors':
			case 'Photos by':
				setTitle('Change background')
				break
			default:
				return <section></section>
		}
	}

	return (
		<section className="board-side-menu">
			<div className="board-side-menu-header">
				{title !== 'Menu' && (
					<a className="board-side-menu-header-go-back" onClick={onGoBack}>
						<IoIosArrowBack className="icon-go-back" />
					</a>
				)}
				<h3 className="board-side-menu-header-title">
					{title === 'Photos by' ? (
						<Fragment>
							{title}{' '}
							<a
								className="header-unsplash-link"
								href="https://unsplash.com/"
								target="_blank"
								rel="noreferrer"
							>
								Unsplash
							</a>
						</Fragment>
					) : (
						title
					)}
				</h3>
				<a className="board-side-menu-header-cancel" onClick={onToggleSideMenu}>
					<IoClose className="icon-close" />
				</a>
			</div>
			<div className="board-side-menu-content">{getCmp()}</div>
		</section>
	)
}
