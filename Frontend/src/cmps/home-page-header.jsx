import { NavLink } from 'react-router-dom'

import logo from '../assets/img/merllo-logo.png'

export function HomePageHeader() {

    return (
        <header className="homepage-header">

            <NavLink to="/" className="homepage-header-logo">
                <img src={logo} alt="logo" />
                <h1 className="merllo-logo">Merllo</h1>
            </NavLink>

            <nav>
                <button className="login-btn">
                    Log in
                </button>

                <button className="singup-btn">
                    Get Merllo for free
                </button>

            </nav>

        </header>
    )
}