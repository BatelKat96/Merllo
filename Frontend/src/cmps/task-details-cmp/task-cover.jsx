import Size1 from '../../assets/img/cover-size1.png'
import Size2 from '../../assets/img/cover-size2.png'

export function TaskCover() {

    return (
        <section className='cmp-dynamoic-options-list cover-section'>

            <div className='cover-section-block size'>
                <h3 className='small-headline cmp-dynamoic-options-title'>Size</h3>

                <div className='size-wrapper'>
                    <img src={Size1} className='size-img' />
                    <img src={Size2} className='size-img' />
                </div>


            </div>

            <div className='cover-section-block colors'>
                <h3 className='small-headline cmp-dynamoic-options-title'>Colors</h3>
            </div>

            <div className='cover-section-block attachments'>
                <h3 className='small-headline cmp-dynamoic-options-title'>Attachments</h3>
            </div>

            <div className='cover-section-block unsplash'>
                <h3 className='small-headline cmp-dynamoic-options-title'>Photos from Unsplash</h3>

                <small>By using images from Unsplash, you agree to their license and Terms of Service</small>
            </div>

        </section>
    )
}