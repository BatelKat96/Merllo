import { Link } from 'react-router-dom'

export function Workspace() {
    console.log('wow:')

    return <section className='workspace-section'>
        <div className='starred-boards'>
            <h1>Starred boards</h1>
            <ul className='board-list clean-list'>
                <Link to="/board/b101"><li className='board-preview board-b101'>Demo</li></Link>
                <Link to="/board/b102"><li className='board-preview board-b102'></li></Link>
                <Link to="/board/b103"><li className='board-preview board-b102'></li></Link>

            </ul>
        </div>
        <div className='recently-viewed-boards'>
            <h1>Recently viewed</h1>
            <ul className='board-list clean-list'>
                <Link to="/board/b101"><li className='board-preview board-b101'>Demo</li></Link>
                <Link to="/board/b102"><li className='board-preview board-b102'></li></Link>
                <Link to="/board/b103"><li className='board-preview board-b103'></li></Link>


            </ul>
        </div>
    </section>
}