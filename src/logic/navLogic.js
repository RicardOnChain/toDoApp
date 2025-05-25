import {Task, TaskList} from "../data"
import {weekPageRender} from "../userInterface/weekPage"

import { addListTab } from "../userInterface/navSection"    
import { deleteListTab } from "../userInterface/navSection"


const attachEventListenners = (()=> {

    const sidebar = document.querySelector("#sidebar")
    
    sidebar.addEventListener("click", (e) => render(e))         //use bubling effect to capture the event


})()

const render = (e)=>{

    const action = e.target.dataset.action
    const listId = e.target.dataset.listId

    const actions = {                                                           // compute what each button will do based on html data-action atribute
        renderWeekPage: () => weekPageRender(),                                 // easier to mantain if new buttons with diferent behaviours are needed
        //renderAllTasksPage: () => genericPageRender(Task.alltasks),             // respects the Open/Close principle
        //renderListPage: () => genericPageRender(TaskList.getListObj(listId)),
        deleteListTab: () => deleteList(listId)
    }

    if (action && typeof actions[action] === "function") {
        actions[action]()
}


}

const createNewList = (listName) => {
    const list = new TaskList(listName)
    addListTab(list)

}

const deleteList = (listId)=>{
    TaskList.deleteList(listId)                 //delete from TaskList object
    deleteListTab(listId)                       //delete from DOM
}

createNewList("Personal")