import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppFooter } from '../cmps/app-footer'

import firstPng from '../assets/img/TrelloUICollage_4x.png'

export function HomePage() {


    return (
    <section className="home-page">

        <div className="first-div">

            <div className="text">
                <h1>Trello brings all your tasks, teammates, and tools together</h1>

                <p>Keep everything in the same place—even if your team isn't.</p>

                <button className="start-demo-btn">
                    <Link to="/workspace">Start demo - it's free!</Link>
                </button>
            </div>

            <div className="img">
                <img src={firstPng} alt="firstPng" />
            </div>
        </div>

        <AppFooter />
    </section >
    )

}