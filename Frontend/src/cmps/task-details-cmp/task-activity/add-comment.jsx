import { Fragment, useState } from 'react'

export function AddComment({ user, addComment }) {
	const [commentTxt, setCommentTxt] = useState('')
	const [isAddCommentOpen, setIsAddCommentOpen] = useState(false)
	const [isButtonClickable, setIsButtonClickable] = useState(true)

	function handleChange({ target }) {
		setCommentTxt(target.value)
		if (target.value && isButtonClickable) setIsButtonClickable(false)
		else if (!target.value && !isButtonClickable) setIsButtonClickable(true)
	}

	function onFocusInput() {
		setIsAddCommentOpen(true)
	}

	function onBlurInput(ev) {
		if (!ev) return
		if (
			ev.relatedTarget?.className === 'btn-save-comment' ||
			ev.relatedTarget?.className === 'new-comment-container'
		) {
			return
		}
		if (!commentTxt) {
			setIsAddCommentOpen(false)
		}
	}

	function onAddComment(ev) {
		ev.preventDefault()
		addComment(ev, commentTxt)
		setCommentTxt('')
		setTimeout(() => ev.target.blur(), 100)
	}

	function handleUserKeyPress(ev) {
		if (ev.key === 'Enter' && !ev.shiftKey) {
			onAddComment(ev)
		}
	}

	const newCommentContainerStyle = isAddCommentOpen
		? { height: 'fit-content', paddingBottom: '8px' }
		: { height: '36px' }
	const addNewCommentBtnStyle = isAddCommentOpen
		? { display: 'block' }
		: { display: 'none' }
	const textAreaStyle = isAddCommentOpen
		? { height: 'fit-content' }
		: { height: '36px' }

	return (
		<Fragment>
			<div className="member-img">
				<img src={user?.imgUrl} alt="member" referrerPolicy="no-referrer" />
			</div>
			<form>
				<div className="new-comment-container" style={newCommentContainerStyle}>
					<textarea
						value={commentTxt}
						onChange={handleChange}
						style={textAreaStyle}
						onFocus={onFocusInput}
						onBlur={(ev) => onBlurInput(ev)}
						onKeyDown={handleUserKeyPress}
						placeholder="Write a comment..."
					></textarea>
					<button
						className="btn-save-comment"
						style={addNewCommentBtnStyle}
						disabled={isButtonClickable}
						type="submit"
						onClick={(ev) => {
							onAddComment(ev)
						}}
					>
						Save
					</button>
				</div>
			</form>
		</Fragment>
	)
}
