import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { TaskMemberModal } from './task-details-cmp/task-cmp-dynamic-modals/task-member-modal'
import { TaskLabelModal } from './task-details-cmp/task-cmp-dynamic-modals/task-label-modal'
import { TaskChecklistModal } from './task-details-cmp/task-cmp-dynamic-modals/task-checklist-modal'
import { TaskDatesModal } from './task-details-cmp/task-cmp-dynamic-modals/task-dates-modal'
import { TaskAttachmentModal } from './task-details-cmp/task-cmp-dynamic-modals/task-attachment-modal'
import { TaskCoverModal } from './task-details-cmp/task-cmp-dynamic-modals/task-cover-modal'
import { TaskMoveModal } from './task-details-cmp/task-cmp-dynamic-modals/task-move-modal'


import Loader from '../assets/img/loader.svg'
import { IoClose } from 'react-icons/io5'
import { logDOM } from '@testing-library/react'

export function DynamoicModal({
	cmpType,
	task,
	onOpenModal,
	boardId,
	groupId,
	refDataBtn,
	onSaveTask
}) {
	const board = useSelector((storeState) => storeState.boardModule.board)
	const [isAddLabelModalOpen, setIsAddLabelModalOpen] = useState(false)
	const [selectedLabel, setSelectedLabel] = useState('')

	const modalRef = useRef(null)
	const [modalStyle, setModalStyle] = useState(false)
	const [modalHeight, setModalHeight] = useState()

	useEffect(() => {
		setModalStyle(true)
		setModalHeight(modalRef.current.getBoundingClientRect().height)
	}, [modalStyle])


	function getModalPos(refDataBtn) {
		const rect = refDataBtn.current.getBoundingClientRect()

		let topModal = rect.top + rect.height + 5
		let bottomModal = ''
		let leftModal = rect.left
		let rightModal = rect.right

		if (window.innerHeight < (rect.top + modalHeight)) {
			topModal = ''
			bottomModal = 10
		}

		if (window.innerWidth < (rect.left + 304)) {
			leftModal = ''
			rightModal = 20
		}

		let modalPos = { bottom: bottomModal, top: topModal, left: leftModal, right: rightModal }

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

	if (cmpType === 'options') {
		data.title = 'Options'
	}

	if (cmpType === 'move card') {
		data.title = 'Move card'
	}


	if (!board)
		return (
			<div className="loader-wrapper">
				<img className="loader" src={Loader} alt="loader" />
			</div>
		)

	return (
		<section className="dynamoic-modal"
			style={getModalPos(refDataBtn)}
			ref={modalRef}>

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
							onClose={onClose}
						/>
					)}

					{cmpType === 'move card' && (
						<TaskMoveModal
							task={task}
							onSaveTask={onSaveTask}
							onClose={onClose}
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
