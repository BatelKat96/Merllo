import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { saveTask } from '../../../store/board.actions'

import Size1 from '../../../assets/img/cover-size1.png'
import Size2 from '../../../assets/img/cover-size2.png'

export function TaskCoverModal({ task }) {

    const { boardId, groupId, taskId } = useParams()
    const [updateTask, setUpdateTask] = useState(task)

    const coverColors = [
        '#7BC86C',
        '#F5DD29',
        '#FFAF3F',
        '#EF7564',
        '#CD8DE5',
        '#5BA4CF',
        '#29CCE5',
        '#6DECA9',
        '#FF8ED4',
        '#172B4D'
    ]

    const coverImgs = [
        'https://images.unsplash.com/photo-1672091161606-71d1cf383221?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ0Njg0MzQ&ixlib=rb-4.0.3&q=80&w=400',

        'https://images.unsplash.com/photo-1672167630747-35dd70a83994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ0Njg0MzQ&ixlib=rb-4.0.3&q=80&w=400',

        'https://images.unsplash.com/photo-1673212815770-16f0a1f1500f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ0Njg0MzQ&ixlib=rb-4.0.3&q=80&w=400',

        'https://images.unsplash.com/photo-1673725437336-e2f3307cebbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ0Njg0MzQ&ixlib=rb-4.0.3&q=80&w=400',

        'https://images.unsplash.com/photo-1672575395994-835afaaeb376?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1MDcwNzU&ixlib=rb-4.0.3&q=80',

        'https://images.unsplash.com/photo-1673026066090-d52723e12d70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDE5NDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ1MDcwNzU&ixlib=rb-4.0.3&q=80&w=400'
    ]

    const [taskToEdit, setTaskToEdit] = useState('')

    const [coverColor, setCoverColor] = useState('')
    const [coverImg, setcoverImg] = useState(coverImgs[0].thumbnail)

    // function getBoardStyle() {
    // 	if (!board) return
    // 	if (board?.style.background) {
    // 		return {
    // 			background: `url('${board.style.thumbnail}') center center / cover`,
    // 		}
    // 	} else if (board?.style.backgroundColor) {
    // 		return { backgroundColor: `${board.style.backgroundColor}` }
    // 	}
    // 	return { backgroundColor: `#0067a3` }
    // }

    async function setTaskCover(backgroundColor, backgroundImage) {

        setCoverColor(backgroundColor)
        setcoverImg(backgroundImage)

        // let style = backgroundImage
        //     ? coverImgs.find((coverImg) => coverImg === backgroundImage)
        //     : { bgColor: backgroundColor }
        let style

        if (backgroundColor) style = { bgColor: backgroundColor }

        else style = { background: `url("${backgroundImage}") center center / cover` }

        task.style = style

        setUpdateTask(task)
        await saveTask(updateTask, groupId, boardId)
    }

    return (
        <section className='cmp-dynamoic-options-list cover-section'>

            {/* <div className='cover-section-block size'>
                <h3 className='small-headline cmp-dynamoic-options-title'>Size</h3>

                <div className='size-wrapper'>
                    <img src={Size1} className='size-img' />
                    <img src={Size2} className='size-img' />
                </div>
            </div> */}

            <div className='cover-section-block colors'>
                <h3 className='small-headline cmp-dynamoic-options-title'>Colors</h3>

                <div className='color-wrapper clean-list'>
                    {coverColors.map((coverColor) => (
                        <li key={coverColor} className={coverColor}>
                            <button
                                className='color-btn'
                                onClick={() => setTaskCover(coverColor, undefined)}
                                style={{ backgroundColor: coverColor }}
                            >
                            </button>
                        </li>
                    ))}
                </div>
            </div>

            <div className='cover-section-block attachments'>
                <h3 className='small-headline cmp-dynamoic-options-title'>Attachments</h3>
                <button className='cover-upload-btn'>
                    Upload a cover image
                </button>
            </div>

            <div className='cover-section-block unsplash'>
                <h3 className='small-headline cmp-dynamoic-options-title'>Photos from Unsplash</h3>

                <div className='img-wrapper clean-list'>
                    {coverImgs.map((coverImg) => (
                        <li key={coverImg} className={coverImg}>
                            <button
                                className='img-btn'
                                onClick={() => setTaskCover(undefined, coverImg)}
                                style={{ background: `url('${coverImg}') center center / cover` }}
                            >
                            </button>
                        </li>
                    ))}
                </div>

                <small>By using images from Unsplash, you agree to their license and Terms of Service</small>
            </div>

        </section>
    )
}