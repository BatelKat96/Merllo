export function SideMenuBgOptions({ onChangeTitle }) {
	return (
		<section className="side-menu-bg-options">
			<section className="option" onClick={() => onChangeTitle('Photos by')}>
				<div className="option-img display hover bg-photos"></div>
				<p>Photos</p>
			</section>
			<section className="option" onClick={() => onChangeTitle('Colors')}>
				<div className="option-img display hover bg-colors"></div>
				<p>Colors</p>
			</section>
		</section>
	)
}
