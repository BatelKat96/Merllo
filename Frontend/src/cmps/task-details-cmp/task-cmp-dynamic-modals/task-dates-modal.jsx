import { useSelector } from 'react-redux'
import { useState } from 'react'

import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import DatePicker, { CalendarContainer } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export function TaskDatesModal({ task, data, onSaveTask, onClose }) {
	const board = useSelector((storeState) => storeState.boardModule.board)
	const [selectedDate, setSelectedDate] = useState(new Date())

	const onAddDueDate = (ev) => {
		const dueDate = new Date(selectedDate).getTime()
		console.log(dueDate)
		task.dueDate = dueDate
		onSaveTask(ev, task)
		onClose()
	}

	const onRemoveDueDate = (ev) => {
		console.log(task.dueDate)
		task.dueDate = null
		console.log(task.dueDate)
		onSaveTask(ev, task)
		onClose()
	}

	return (
		<>
			<section className="dates">
				<DatePicker
					selected={selectedDate}
					onChange={(date) => setSelectedDate(date)}
					calendarClassName="calendar"
					inline
				/>
				{/* <LocalizationProvider
					className="calendar"
					style={{ margin: '-8px 0 0 0' }}
					dateAdapter={AdapterDayjs}
				>
					<StaticDatePicker
						disableToolbar
						style={{ margin: '-8px 0 0 0' }}
						width="300px"
						height="300px"
						margin="-8px 0 0 0"
						displayStaticWrapperAs="desktop"
						outsideCurrentMonth={true}
						closeOnSelect={false}
						openTo="day"
						views={['month', 'day']}
						value={selectedDate}
						onChange={setSelectedDate}
						renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider> */}

				<div className="dates-actions">
					<button
						onClick={(event) => {
							onAddDueDate(event)
						}}
						className="btn-dates save"
					>
						Save
					</button>
					<button
						onClick={(event) => {
							onRemoveDueDate(event)
						}}
						className="clean-btn btn-dates remove"
					>
						Remove
					</button>
				</div>
			</section>
		</>
	)
}
