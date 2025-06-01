import {Task,TaskList, dataManager} from "../data"

const newTaskModal = document.querySelector("#newTaskModal")

const attachEventListenners = (()=> {

    const mainDiv = document.querySelector("#main")
    
    mainDiv.addEventListener("click", (e) => render(e))         //use bubling effect to capture the event


})()

const render = (e)=>{

    const action = e.target.closest("[data-action]")?.dataset.action
    const taskId = e.target.closest("[data-taskid]")?.dataset.taskid

    const actions = {                                                           // compute what each button will do based on html data-action atribute
        openNewTaskPopUp: () => newTaskModal.showModal(),                       // easier to mantain if new buttons with diferent behaviours are needed
        toggleCheckButton: () => toggleCheckButton(taskId),
        editTask: () => editTask(e),
        deleteTask: () => deleteTask(taskId),
    }

    if (action && typeof actions[action] === "function") {
        actions[action]()
}


}

const addTask= (e) => {
    
}

const toggleCheckButton= (taskId) => {
    
}

const deleteTask = (taskId) => {
    dataManager().deleteDataById(taskId)

    const taskCard = document.querySelector(`[data-taskId="${taskId}"]`)
    taskCard.remove()
}

const editButton = (taskId) => {

}
