import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { TaskMemberModal } from './task-details-cmp/task-cmp-dynamic-modals/task-member-modal'
import { TaskLabelModal } from './task-details-cmp/task-cmp-dynamic-modals/task-label-modal'
import { TaskChecklistModal } from './task-details-cmp/task-cmp-dynamic-modals/task-checklist-modal'
import { TaskDatesModal } from './task-details-cmp/task-cmp-dynamic-modals/task-dates-modal'
import { TaskCoverModal } from './task-details-cmp/task-cmp-dynamic-modals/task-cover-modal'

import Loader from '../assets/img/loader.svg'
import { IoClose } from 'react-icons/io5'

export function DynamoicModal({
	cmpType,
	task,
	onOpenModal,
	boardId,
	groupId,
	refDataBtn,
	onSaveTask,
	ref
}) {
	const board = useSelector((storeState) => storeState.boardModule.board)
	const [isAddLabelModalOpen, setIsAddLabelModalOpen] = useState(false)
	const [selectedLabel, setSelectedLabel] = useState('')

	const [width, setWidth] = useState(window.innerWidth)
	const [height, setHeight] = useState(window.innerHeight)

	// useEffect(() => {
	// 	window.addEventListener("resize", updateScreenDimensions)
	// 	return () => window.removeEventListener("resize", updateScreenDimensions)
	// }, [])

	function updateScreenDimensions() {
		setWidth(window.innerWidth)
		setHeight(window.innerHeight)
	}

	// const modalPos = {
	// 	top: refDataBtn.current.offsetTop + 'px',
	// 	left: refDataBtn.current.offsetLeft + 'px',
	// }


	const modalRef = useRef()
	const modalSize = modalRef.current.getBoundingClientRect()
	console.log(modalSize);

	function getModalPos(ref) {
		const rect = ref.current.getBoundingClientRect()
		console.log(rect);

		const modalPos = { top: rect.top + 38, left: rect.left }

		console.log('window.innerWidth', window.innerWidth);
		console.log('window.innerHeight', window.innerHeight);
		if (window.innerWidth - rect.right < 320) modalPos.left -= 96

		if (window.innerHeight - rect.bottom < 10) modalPos.top -= -400

		return modalPos
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
		<section className="dynamoic-modal" style={getModalPos(refDataBtn)} onBlur={onClose} ref={this.modalRef}>

			<div className="dynamoic-modal-wrapper">

				<a onClick={onClose}>
					<IoClose className="close-icon" />
				</a>

				<p className="dynamoic-modal-title">{data.title}</p>

				<div className="dynamic-modal-container">

					{cmpType === 'members' && (
						<TaskMemberModal
							task={task}
							data={data}
							onSaveTask={onSaveTask}
						/>
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
						<TaskCoverModal
							task={task}
						/>
					)}

					{cmpType === 'cover' && (
						<TaskCoverModal
							task={task}
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
		</section>
	)
}
