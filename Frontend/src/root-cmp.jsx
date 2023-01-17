import React from 'react'
import { Routes, Route } from 'react-router'



import { AppHeader } from './cmps/app-header'
// import { UserDetails } from './pages/user-details'
import { HomePage } from './pages/home-page'
import { AboutUs } from './pages/about-us'
import { Workspace } from './pages/workspace'
import { Board } from './pages/board'
import { TaskEdit } from './pages/task-edit'

export function RootCmp() {

    return (
        <div>
            <AppHeader />
            <main>
                <Routes>
                    <Route element={<HomePage />} path="/" />
                    <Route element={<AboutUs />} path="/about" />
                    <Route element={<Workspace />} path="/workspace" />
                    <Route element={<Board />} path="/board/:boardId" />
                    {/* cmp- groplist=> tasklist=>task preview=> || page==taskedit */}
                    <Route element={<TaskEdit />} path="/board/:boardId/:taskId" />
                    {/* <Route element={<UserDetails />} path="/user/:id" /> */}
                </Routes>
            </main>

        </div>
    )
}


