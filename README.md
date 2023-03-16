
# Merllo - pixel perfect, E2E clone of Trello (React + Node.js). 

Kanban-style task management board app inspired by trello.com, [Here is my project link](https://merllo.onrender.com/ "Merllo link").


![board](https://user-images.githubusercontent.com/116891360/225691142-1a13f625-cc06-4659-a301-39e43ed7f503.png)


___

### Table of Contents
- [Trello Description](#trello-description)
- [Application Features](#application-features)
- [Technologies](#technologies)
- [Getting started](#getting-started)
- [Showcase](#showcase)

## Trello Description
Trello is an app in which you can manage projects and tasks using a kanban board. A board contains lists and tasks. Usually each project is a board, and the lists and cards are the tasks and subjects in the project. Users can modify the board and change list and card locations using Drag and Drop.
Users can work together and watch live changes. 
There are many other features in Trello, such as labels, due date for tasks, members and more. 

## Application Features
- Create **Boards** and manage projects: Using **D&D**, create, remove, and update lists and tasks.
- Create, edit and delete **Tasks** to the deepest level: Labels, due date, members, cover images, checklists, copy, move and delete.
- **Side Menu:** Change the background of the board with the **Unsplash Photo API**.
- Login / signup authentication which is encrypted and safe.

## Technologies
The technology stack we used was **MERN - MongoDB, Express, React, Node.js**.
The app uses **webSockets** to update the board in real-time.
The API calls to the backend are done with the **REST API** method, and we used middlewares to authenticate and authorize actions.

The layout and pixel-perfect were made with **Sass**. 

## Getting started
Head to the repository on top and clone the project or download the files.

```
git clone https://github.com/BatelKat96/Our-Trello
```

Enter the backend folder and make sure you have node_modules installed, then initiate the server with 'npm start':

```
cd backend
npm i 
npm run dev
```

You shuold get a console ouput that the server is up and running at port 3030.
Enter the frontend folder and repeat the same process.

```
cd frontend
npm i 
npm start
```

You shuold get a console ouput that the server is up and running at localhost:3000.

That's it! The App should be opened automatically, enjoy!

## Showcase

### Homepage
The landing page in which the user can sign up / login, or press the call to action button to start a demo.

![Homepage image](https://user-images.githubusercontent.com/116891360/225691386-f3f787e0-697a-416f-b694-c18f007bf685.png)

### Workspace
All of the boards are Here, and the user can create, star and delete their boards.

![Workspace](https://user-images.githubusercontent.com/116891360/225691590-616f6c92-6843-4851-8c50-53d2e98fe487.png)

### Board
All the functionality that you have in Trello. D&D, real-time-updates, quick edit, editing tasks to the deepest level, side-menu and much more, [just check it out!](https://merllo.onrender.com/ "Merllo link")

![board](https://user-images.githubusercontent.com/116891360/225691700-04b79dea-000d-48ca-a030-39cf4d5beff2.png)

### Signup
We created an e2e authentication flow, including encrypting the users' details and midelwears.

![login](https://user-images.githubusercontent.com/116891360/225691756-2fbcebd5-edd9-4d86-9731-96f752519a34.png)

### Task details
Here the users can edit their tasks and watch it happen in real time. Every button on the right menu opens a dynamic modal which fits the content accordingly to the pressed button.

![Task details](https://user-images.githubusercontent.com/116891360/225695266-c2961814-ac6f-4bad-9c38-77e17ae20c48.png)

### Side menu
The menu on the right lets the user change the board background with unsplash Images, or just pick a pre-set color.

![Side menu](https://user-images.githubusercontent.com/116891360/225693136-ecab027a-d373-4ed4-8d4c-21439e52eaac.png)

### Authors
 - [Batel Katiei](https://github.com/BatelKat96)
 - [Dror Karpfen](https://github.com/Drorka)
 - [Beta Shalmaev](https://github.com/beta0022)
