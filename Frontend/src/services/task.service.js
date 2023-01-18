
// import { storageService } from './async-storage.service.js'
// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

import { taskStorageService } from './async-storage.task.service'
import { utilService } from './util.service'

const STORAGE_TASKS_KEY = 'task'

_createTasks()

export const taskService = {

    getById,
    save,
    //     remove,
    //     // getEmptyTask,
    //     // addTaskMsg
}
// window.cs = taskService


function getById(taskId) {
    console.log('taskId ser:', taskId)

    return taskStorageService.get(STORAGE_TASKS_KEY, taskId)
}

// async function remove(taskId) {
//     // throw new Error('Nope')
//     await taskStorageService.remove(STORAGE_TASKS_KEY, taskId)
// }

async function save(task) {
    var savedtask
    if (task._id) {
        savedtask = await taskStorageService.put(STORAGE_TASKS_KEY, task)
    } else {
        // Later, owner is set by the backend
        // task.owner = userService.getLoggedinUser()
        savedtask = await taskStorageService.post(STORAGE_TASKS_KEY, task)
    }
    return savedtask
}

function _createTasks() {
    let tasks = utilService.loadFromStorage(STORAGE_TASKS_KEY)
    console.log('tasks:', tasks)

    if (!tasks || !tasks.length) {
        tasks = [
            {
                "id": "c105",
                "title": "Support sockets",
                "archivedAt": null,
                "labelIds": ["l103"],
                "dueDate": 1674664581,
                "byMember": {
                    "_id": "u103",
                    "username": "Dror",
                    "fullname": "Dror K",
                    "imgUrl": "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                },
                "memberIds": ["u101", "u103"]
            },
            {
                "id": "c106",
                "title": "Build app header",
                "archivedAt": null,
                "labelIds": ["l103"],
                "dueDate": 1674664581,
                "byMember": {
                    "_id": "u103",
                    "username": "Dror",
                    "fullname": "Dror K",
                    "imgUrl": "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                },
                "style": {
                    "bgColor": "#ffaf3f"
                }
            }
        ]
        utilService.saveToStorage(STORAGE_TASKS_KEY, tasks)
    }
}

    // function _createTask(title, description, labelIds, dueDate, byMember, style, comments) {
    //     return {
    //         id: utilService.makeId(),
    //         title,
    //         description,
    //         labelIds,
    //         dueDate,
    //         byMember,
    //         style,
    // comments
    //     }
    // }

// function getEmptytask() {
//     return {
//         vendor: 'Susita-' + (Date.now() % 1000),
//         price: utilService.getRandomIntInclusive(1000, 9000),
//     }
// }


// TEST DATA
// taskStorageService.post(STORAGE_TASKS_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




