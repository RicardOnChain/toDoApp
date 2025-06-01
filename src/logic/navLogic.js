import { makeOffer } from "thirdweb/extensions/marketplace"
import {TaskList, dataManager} from "../data"
import { loadTaskCard, addTaskBoard, printHeader} from "../userInterface/genericPage"
import { addListTab } from "../userInterface/navSection"    
import { deleteListTab } from "../userInterface/navSection"

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
        renderWeekPage: () => renderAllTasks(),                                 // easier to mantain if new buttons with diferent behaviours are needed
        renderAllTasksPage: () => renderAllTasks(),                             // respects the Open/Close principle
        renderListPage: () => renderTasksByList(listId),
        deleteListTab: () => deleteList(listId)
    }

    if (action && typeof actions[action] === "function") {
        actions[action]()
}


}

const createNewList = (listName) => {

    const list = new TaskList(listName)
    dataManager().saveToStorage(list)
    addListTab(list)

    modal.close()


}

const deleteList = (listId)=>{
    dataManager().deleteDataById(listId)           //delete List from local storage
    deleteListTab(listId)                       //delete from DOM
    renderAllTasks()
}

const renderAllTasks = () =>{
    printHeader("All Tasks")
    addTaskBoard()

    //const tasksArray = dataManager().getAllTasks()
    const tasksArray = [
        {
            name: "Clean House",
            data: 26121997,
            priority: "high",
            checklist:"off",
            listName: "Personal",
            type: "task",
            id: 12345676
        },
        {
            name: "Clean House",
            data: 26121997,
            priority: "high",
            checklist:"off",
            listName: "Personal",
            type: "task",
            id: 12345676
        }
    ]
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

