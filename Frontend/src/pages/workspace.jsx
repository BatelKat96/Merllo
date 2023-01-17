import { Link } from 'react-router-dom'

export function Workspace() {
    return <section className='workspace-section'>
        <div className='starred-boards'>
            <h1>Starred boards</h1>
            <ul className='board-list'>
                <li><Link to="/board/:boardId"><img src="" alt="" /></Link></li>
                <li><Link to="/board/:boardId"><img src="" alt="" /></Link></li>
                <li><Link to="/board/:boardId"><img src="" alt="" /></Link></li>
                <li><Link to="/board/:boardId"><img src="" alt="" /></Link></li>
            </ul>
        </div>
        <div className='recently-viewed-boards'>
            <h1>Recently viewed</h1>
            <ul className='board-list'>
                <li><Link to="/board/:boardId"><img src="" alt="" /></Link></li>
                <li><Link to="/board/:boardId"><img src="" alt="" /></Link></li>
                <li><Link to="/board/:boardId"><img src="" alt="" /></Link></li>
                <li><Link to="/board/:boardId"><img src="" alt="" /></Link></li>

            </ul>
        </div>
    </section>
}