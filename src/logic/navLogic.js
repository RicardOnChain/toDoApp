import { makeOffer } from "thirdweb/extensions/marketplace"
import {TaskList, dataManager} from "../data"
import { loadTaskCard, addTaskBoard, printHeader} from "../userInterface/genericPage"
import { addListTab } from "../userInterface/navSection"    
import { deleteListTab } from "../userInterface/navSection"
import { deleteTask } from "./contentLogic"

const modal = document.querySelector("dialog")

const attachEventListeners = (()=> {

    const sidebar = document.querySelector("#sidebar")
    
    sidebar.addEventListener("click", (e) => wireEventListeners(e))         //use bubling effect to capture the event


})()

const wireEventListeners = (e)=>{

    const action = e.target.closest("[data-action]")?.dataset.action
    const listId = e.target.closest("[data-listid]")?.dataset.listid
    const inputField = document.querySelector("#listNameInput")

    const actions = {              
        addNewList: () => {modal.showModal();
                        inputField.focus()
                    },                                        // compute what each button will do based on html data-action atribute
        createList: () => createNewList(inputField.value),
        closeModal: () => modal.close(),
        renderWeekPage: () => renderWeekTasks(),                                 // easier to mantain if new buttons with diferent behaviours are needed
        renderAllTasksPage: () => renderAllTasks(),                             // respects the Open/Close principle
        renderListPage: () => renderTasksByList(listId),
        deleteListTab: () => deleteList(listId)
    }

    if (action && typeof actions[action] === "function") {
        actions[action]()
        inputField.value=""         //clear input value
}

    

}

const createNewList = (listName) => {

    if (dataManager().getDataByListName(listName)!= null) {
        return (alert("You already have a list with this name."))
        }
    const list = new TaskList(listName)
    dataManager().saveToStorage(list)
    addListTab(list)

    modal.close()

    return list


}

const renderAllListTabs = () => {

    const listArray = dataManager().getAllLists()

    for (const list of listArray){
        addListTab(list)
    }
}

const deleteList = (listId)=>{

    const listContent = dataManager().getDataById(listId).tasks     
    listContent.forEach(task => deleteTask(task.id))                //delete all tasks from the list

    dataManager().deleteDataById(listId)                            //delete List from local storage
    deleteListTab(listId)                                           //delete from DOM
    renderWeekTasks()
}

const renderAllTasks = () =>{
    printHeader("All Tasks")
    addTaskBoard()

    const tasksArray = dataManager().getAllTasks()

    tasksArray.forEach(task => loadTaskCard(task))

}

const renderWeekTasks = () =>{
    printHeader("Next 7 days")
    addTaskBoard()

    const tasksArray = dataManager().getWeekTasks()

    tasksArray.forEach(task => loadTaskCard(task))

}

const renderTasksByList = (listId) =>{
    const listObj= dataManager().getDataById(listId)

    const tasksArray = listObj.tasks

    printHeader (listObj.name)
    addTaskBoard()                          // add empty taskboard
    
    if (tasksArray.length != 0){ 
        
        tasksArray.forEach(task => {loadTaskCard(task)})
    }
    
}

renderAllListTabs()
renderWeekTasks()

export {createNewList, renderAllTasks}