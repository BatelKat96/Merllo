import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'

import { TaskMemberModal } from './task-cmp-dynamic-modals/task-member-modal'
import { TaskLabelModal } from './task-cmp-dynamic-modals/task-label-modal'
import { TaskChecklistModal } from './task-cmp-dynamic-modals/task-checklist-modal'
import { TaskDatesModal } from './task-cmp-dynamic-modals/task-dates-modal'
import { TaskCoverModal } from './task-cmp-dynamic-modals/task-cover-modal'

import Loader from '../../assets/img/loader.svg'
import { IoClose } from 'react-icons/io5'
import { TaskAttachmentModal } from './task-cmp-dynamic-modals/task-attachment-modal'

export function TaskCmpDynamoic({
	cmpType,
	task,
	onOpenModal,
	boardId,
	groupId,
	refDataBtn,
	onSaveTask,
}) {
	const board = useSelector((storeState) => storeState.boardModule.board)
	const [isAddLabelModalOpen, setIsAddLabelModalOpen] = useState(false)
	const [selectedLabel, setSelectedLabel] = useState('')


	const screenSize = useRef([window.innerWidth, window.innerHeight])
	// console.log('Width', {screenSize.current[0]})

	const modalPos = {
		top: refDataBtn.current.offsetTop + 'px',
		left: refDataBtn.current.offsetLeft + 'px',
	}

	function onClose() {
		onOpenModal()
	}

	let data = {
		title: cmpType,
		txt: '',
		placeholder: `Search ${cmpType}`,
		optionsTitle: `Board ${cmpType}`,
	}

	if (cmpType === 'labels' && isAddLabelModalOpen) {
		if (!selectedLabel) data.title = 'Create Label'
		else data.title = 'Edit Label'
	}

	if (!board)
		return (
			<div className="loader-wrapper">
				<img className="loader" src={Loader} alt="loader" />
			</div>
		)

	return (
		<div className="task-cmp-dynamoic" style={modalPos}>
			<div className="task-cmp-dynamoic-container">
				<a onClick={onClose}>
					<IoClose className="close-icon" />
				</a>
				<p className="cmp-dynamoic-title">{data.title}</p>
				<div className="dynamic-container">

					{cmpType === 'members' && (
						<TaskMemberModal task={task} data={data} onSaveTask={onSaveTask} />
					)}

					{cmpType === 'labels' && (
						<TaskLabelModal
							task={task}
							data={data}
							onSaveTask={onSaveTask}
							setIsAddLabelModalOpen={setIsAddLabelModalOpen}
							isAddLabelModalOpen={isAddLabelModalOpen}
							selectedLabel={selectedLabel}
							setSelectedLabel={setSelectedLabel}
						/>
					)}

					{cmpType === 'checklist' && (
						<TaskChecklistModal
							task={task}
							onSaveTask={onSaveTask}
							onClose={onClose}
						/>
					)}

					{cmpType === 'dates' && (
						<TaskDatesModal
							task={task}
							data={data}
							onSaveTask={onSaveTask}
							onClose={onClose}
						/>
					)}


					{cmpType === 'attachment' && (
						<TaskAttachmentModal
							task={task}
							onSaveTask={onSaveTask}
							onClose={onClose}
						/>
					)}

					{cmpType === 'cover' && (
						<TaskCoverModal
							task={task}
							onSaveTask={onSaveTask}
						/>
					)}

					{cmpType === 'move card' && (
						<TaskCoverModal
							task={task}
						/>
					)}


					{cmpType === 'create board' && (
						<TaskCoverModal
						/>
					)}


					{cmpType === 'list action' && (
						<TaskCoverModal
							task={task}
						/>
					)}


					{cmpType === 'options' && (
						<TaskCoverModal
							task={task}
						/>
					)}

				</div>
			</div>
		</div>
	)
}
