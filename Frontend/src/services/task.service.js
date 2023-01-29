
import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const STORAGE_TASKS_KEY = 'task'

_createTasks()

export const taskService = {
    getById,
    save,
    remove
}


function getById(taskId) {
    return storageService.get(STORAGE_TASKS_KEY, taskId)
}

async function remove(taskId) {
    await storageService.remove(STORAGE_TASKS_KEY, taskId)
}

async function save(task) {
    var savedtask
    if (task._id) {
        savedtask = await storageService.put(STORAGE_TASKS_KEY, task)
    } else {
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