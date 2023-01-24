import { IoClose } from 'react-icons/io5'

export function GroupDropdown({
	toggleDropdown,
	onRemoveGroup,
	onCopyGroup,
	group,
}) {
	return (
		<section className="group-dropdown">
			<div className="group-dropdown-container">
				<div className="group-dropdown-header">
					<span>List actions</span>
					<button
						className="btn-group-dropdown close"
						onClick={(event) => toggleDropdown(event, group.id)}
					>
						<IoClose className="icon-close" />
					</button>
				</div>
				<ul className="group-dropdown-actions clean-list">
					<li onClick={() => onCopyGroup(group)}>Copy list</li>
					<li onClick={() => onRemoveGroup(group.id)}>Delete list</li>
				</ul>
			</div>
		</section>
	)
}
