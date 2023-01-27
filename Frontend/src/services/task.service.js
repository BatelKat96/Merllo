
// import { storageService } from './async-storage.service.js'
// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const STORAGE_TASKS_KEY = 'task'

_createTasks()

export const taskService = {

    getById,
    save,
    remove,

}


function getById(taskId) {
    return storageService.get(STORAGE_TASKS_KEY, taskId)
}

async function remove(taskId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_TASKS_KEY, taskId)
}

async function save(task) {
    var savedtask
    if (task._id) {
        savedtask = await storageService.put(STORAGE_TASKS_KEY, task)
    } else {
        // task.owner = userService.getLoggedinUser()
        savedtask = await storageService.post(STORAGE_TASKS_KEY, task)
    }
    return savedtask
}

function _createTasks() {
    let tasks = utilService.loadFromStorage(STORAGE_TASKS_KEY)
    console.log('tasks:', tasks)

    if (!tasks || !tasks.length) {
        tasks = [
            {
                "_id": "c101",
                "title": "Basic CRUDL",
                "archivedAt": null,
                "labelIds": ["l104"],
                "dueDate": 1674837381,
                "byMember": {
                    "_id": "u103",
                    "username": "Dror",
                    "fullname": "Dror K",
                    "imgUrl": "http://dror-img"
                },
                "comments": [
                    {
                        "id": "cm101",
                        "txt": "this is a comment",
                        "createdAt": 1673973381,
                        "byMember": {
                            "_id": "u103",
                            "fullname": "Dror K",
                            "imgUrl": "http://dror-img"
                        }
                    }
                ]
            },
            {
                "_id": "c102",
                "title": "Build app footer",
                "description": "description",
                "archivedAt": null,
                "labelIds": ["l103"],
                "dueDate": 1674664581,
                "byMember": {
                    "_id": "u103",
                    "username": "Dror",
                    "fullname": "Dror K",
                    "imgUrl": "http://dror-img"
                },
                "style": {
                    "bgColor": "#7bc86c"
                },
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
// storageService.post(STORAGE_TASKS_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




