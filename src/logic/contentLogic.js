import {Task,TaskList, dataManager} from "../data"
import { createNewList, renderAllTasks } from "./navLogic"
import { loadDataToModal, updateTaskUI } from "../userInterface/genericPage"

const mainDiv = document.querySelector("#main")

const newTaskModal = document.querySelector("#newTaskModal")
const newTaskForm = document.querySelector("#newTaskForm")

const updateTaskModal = document.querySelector("#updateTaskModal")
const updateTaskForm = document.querySelector("#updateTaskForm")

const attachEventListenners = (()=> {

    
    mainDiv.addEventListener("click", (e) => render(e))         //use bubling effect to capture the event

    newTaskForm.addEventListener("submit", (e) => addTask(e))   
    updateTaskForm.addEventListener("submit", (e) => updateTask(e))   
    

})()

const render = (e)=>{

    const action = e.target.closest("[data-action]")?.dataset.action
    const taskId = e.target.closest("[data-taskid]")?.dataset.taskid

    const actions = {                                                           // compute what each button will do based on html data-action atribute
        openNewTaskPopUp: () => newTaskModal.showModal(),                       // easier to mantain if new buttons with diferent behaviours are needed
        toggleCheckTask: () => toggleCheckTask(e, taskId),
        editTask: () => openEditTaskModal(taskId),
        deleteTask: () => deleteTask(taskId),
        closeModal: () => {newTaskModal.close()
                           updateTaskModal.close()}
    }

    if (action && typeof actions[action] === "function") {
        actions[action]()
    }
    
    
}

const toggleCheckTask = (e, taskId) => {

    updateTaskUI(e, taskId)
    const task = dataManager().getDataById(taskId)
    task.check = task.check == "off" ? "on" : "off" 

    dataManager().saveToStorage(task)
    
}

const openEditTaskModal = (taskId) => {
    updateTaskModal.showModal()
    loadDataToModal(taskId)
    
}

const deleteTask = (taskId) => {
    
    const task = dataManager().getDataById(taskId)                          
    const list = dataManager().getDataByListName(task.listName)
    const listWithMethods = Object.assign(new TaskList(), list);
    
    listWithMethods.removeTaskFromList(task)                        //delete from list 
    
    dataManager().saveToStorage(listWithMethods)                    //save updated list to storage
    
    const taskCard = document.querySelector(`[data-taskId="${taskId}"]`)    //delete from takboard card
    taskCard.remove()
    
    dataManager().deleteDataById(taskId)                    //delete from storage
}


const addTask= (e) => {

    e.preventDefault()

    const formData = new FormData(e.target)

    let title= formData.get("taskName")
    let date= formData.get("taskDate")
    let priority= formData.get("taskPriority")
    let list= formData.get("taskList")

    const listObj = dataManager().getDataByListName(list)
    
    if (listObj === null){                                  //check if task list exists and create a new one if it doesn't
        
        const newList = createNewList(list)
        const newTask = new Task(title,date, priority, list)

        newList.addTasktoList(newTask)
        dataManager().saveToStorage(newTask)
        dataManager().saveToStorage(newList)

    }else {                                                         
        const newTask = new Task(title,date, priority, list)
        
        const listWithMethods = Object.assign(new TaskList(), listObj)  //saved obj to local storage loose methods. This creates a new fully functioning obj copy 
        listWithMethods.addTasktoList(newTask)

        dataManager().saveToStorage(newTask)
        dataManager().saveToStorage(listObj)

    }

    e.target.reset()

    newTaskModal.close()

    renderAllTasks()


}

const updateTask = (e) => {

    e.preventDefault()

    const taskId = e.submitter?.dataset.taskid
    const task = dataManager().getDataById(taskId)

    const currentListObj = dataManager().getDataByListName(task.listName)
    const currentListObjwithMethods = Object.assign(new TaskList(), currentListObj)

    currentListObjwithMethods.removeTaskFromList(task)          //remove task from current list
    
    //get updated info
    const formData = new FormData(e.target)
    task.name= formData.get("taskName")
    task.date= formData.get("taskDate")
    task.priority= formData.get("taskPriority")
    task.listName= formData.get("taskList")
    
    let listTargetObj = dataManager().getDataByListName(task.listName)
    
    if (listTargetObj === null){                                  //check if task list exists and create a new one if it doesn't
        
        listTargetObj = createNewList(task.listName)
        listTargetObj.addTasktoList(task)
        
    }else {                                                         
        
        listTargetObj = Object.assign(new TaskList(), listTargetObj)  //saved obj to local storage loose methods. This creates a new fully functioning obj copy (not saved in storage so does not duplicate data entries)
        listTargetObj.addTasktoList(task)
    }
    
    dataManager().saveToStorage(currentListObjwithMethods)
    dataManager().saveToStorage(task)
    dataManager().saveToStorage(listTargetObj)
    updateTaskModal.close()

    renderAllTasks()
}


export {deleteTask}