
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { removeFromCart, checkout } from '../store/car.actions'
import { UserMsg } from './user-msg.jsx'

export function HomePageFooter() {

    return (
        <footer className="homepage-footer">
            <Link to="/about"> about as</Link>
            <UserMsg />
        </footer>
    )
}