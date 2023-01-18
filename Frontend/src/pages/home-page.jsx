import React from 'react'

import { Link } from 'react-router-dom'
import { HomePageFooter } from '../cmps/home-page-footer'

import heroPng from '../assets/img/TrelloUICollage_4x.png'
import productivityPng from '../assets/img/Carousel_Image_Boards_2x.png'

export function HomePage() {

    return (
        <>
            <section className="home-page">

                <div className="bg-gradient-hero">

                    <section className="hero-secrion">

                        <div className="text">
                            <h1>Trello brings all your tasks, teammates, and tools together</h1>

                            <p>Keep everything in the same place—even if your team isn't.</p>

                            <button className="start-demo-btn">
                                <Link to="/workspace">Start demo - it's free!</Link>
                            </button>
                        </div>

                        <div className="img">
                            <img src={heroPng} alt="firstPng" />
                        </div>

                    </section>
                </div>

                <div className="bg-gradient-101">

                    <section className="prod-section">

                        <h5>Merllo 101</h5>

                        <h2>A productivity powerhouse</h2>

                        <p>Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who's doing what and what needs to get done. Learn more in our guide for getting started.</p>

                        <img src={productivityPng} alt="secondPng" />

                    </section>
                </div>

        <HomePageFooter />
    </section >
        </>
    )

}