import { useState } from 'react'

export const AddComment = ({ user, addComment }) => {
	const [comment, setComment] = useState('')
	const [inputSize, setInputSize] = useState({ height: `36px` })
	const [isButtonShown, setIsButtonShown] = useState({ display: `none` })
	const [isButtonClickable, setIsButtonClickable] = useState(true)

	const handleChange = ({ target }) => {
		setComment(target.value)
		if (target.value && isButtonClickable) setIsButtonClickable(false)
		else if (!target.value && !isButtonClickable) setIsButtonClickable(true)
	}

	const onFocusInput = () => {
		setInputSize({ height: `84px` })
		setIsButtonShown({ display: `block` })
	}

	const onBlurInput = () => {
		if (!comment) {
			setInputSize({ height: `36px` })
			setIsButtonShown({ display: `none` })
		}
	}

	const onAddComment = (ev) => {
		ev.preventDefault()
		addComment(comment)
		setComment('')
		setTimeout(() => ev.target.blur(), 100)
	}

	const handleUserKeyPress = (ev) => {
		if (ev.key === 'Enter' && !ev.shiftKey) {
			onAddComment(ev)
		}
	}

	return (
		<section className="add-comment">
			<div className="member-img">
				<img src={user?.imgUrl} alt="member" referrerPolicy="no-referrer" />
			</div>
			<form onSubmit={onAddComment}>
				<textarea
					value={comment}
					onChange={handleChange}
					style={inputSize}
					onFocus={onFocusInput}
					onBlur={onBlurInput}
					onKeyDown={handleUserKeyPress}
					placeholder="Write a comment..."
				></textarea>
				{/* <button
					className="btn-save-comment"
					style={isButtonShown}
					disabled={isButtonClickable}
				>
					Save
				</button> */}
			</form>
		</section>
	)
}
