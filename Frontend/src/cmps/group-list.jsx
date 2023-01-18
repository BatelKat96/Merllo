import { useEffect, useState } from 'react'
import { boardService } from '../services/board.service'

import { TaskList } from './task-list'

export function GroupList({ groups, onRemoveGroup }) {
	console.log('group-list groups', groups)

	function onAddTask() {
		console.log('add new task to group')
	}

	return (
		<section className="group-list-container">
			<ul className="group-list clean-list">
				{groups.map((group) => (
					<li className="group-wrapper" key={group.id}>
						<div className="group-name">
							<p>{group.title}</p>
							<button
								onClick={() => {
									onRemoveGroup(group.id)
								}}
							>
								remove
							</button>
						</div>
						<TaskList tasks={group.tasks} />
						<div className="group-bottom">
							<button className="add-card">+ Add a card</button>
							<button>copy</button>
						</div>
					</li>
				))}
			</ul>
		</section>
	)
}
