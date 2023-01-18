import React from 'react'
import { Routes, Route } from 'react-router'

// import { HomePageHeader } from './cmps/home-page-header'
// import { UserDetails } from './pages/user-details'
import { MainHeader } from './cmps/main-header'

import { HomePage } from './pages/home-page'
import { About } from './pages/about'
import { Workspace } from './pages/workspace'
import { Board } from './pages/board'
import { TaskDetails } from './pages/task-details'

export function RootCmp() {
	return (
		<section>
			{/* <HomePageHeader /> */}
			<MainHeader />
			{/* <div className="main-container app full"> */}
			<div>
				{/* <main className="full main-section main-container"> */}
				<main>
					<Routes>
						<Route element={<HomePage />} path="/" />
						<Route element={<About />} path="/about" />
						<Route element={<Workspace />} path="/workspace" />
						<Route element={<Board />} path="/board/:boardId" />
						{/* cmp- groplist=> tasklist=>task preview=> || page==taskedit */}
						{/* <Route element={<TaskEdit />} path="/board/:boardId/:taskId" /> */}
						<Route element={<TaskDetails />} path="/board/:boardId/:taskId" />
						{/* <Route element={<UserDetails />} path="/user/:id" /> */}
					</Routes>
				</main>
			</div>
		</section>
	)
}
