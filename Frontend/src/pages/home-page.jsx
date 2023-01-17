import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppFooter } from '../cmps/app-footer'


export function HomePage() {


    return (
        <section>
            <h1>hello home page</h1>

            <Link to="/workspace"> Start demo</Link>
            <AppFooter />
        </section >
    )
}