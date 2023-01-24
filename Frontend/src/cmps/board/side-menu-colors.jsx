export const SideMenuColors = ({ changeBackground }) => {
	const colors = [
		'#0079bf',
		'#d29034',
		'#519839',
		'#b04632',
		'#89609e',
		'#cd5a91',
		'#4bbf6b',
		'#00aecc',
		'#838c91',
	]

	return (
		<section className="side-menu-colors">
			<ul className="clean-list color-list">
				{colors.map((backgroundColor) => (
					<li
						key={backgroundColor}
						className="display hover"
						style={{ backgroundColor }}
						onClick={() => changeBackground({ backgroundColor })}
					></li>
				))}
			</ul>
		</section>
	)
}
