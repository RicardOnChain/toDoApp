import { dataManager } from "../data"

const mainDiv = document.querySelector("#content")
const headerDiv = document.querySelector("#header")
const taskBoard = document.createElement("div")
taskBoard.setAttribute("id","taskBoard")

const printHeader = (title) => {

    headerDiv.textContent=""

    const pageTitle= document.createElement("h2")
    pageTitle.classList.add("headerTitle")
    pageTitle.innerText= title
    headerDiv.appendChild(pageTitle)
}


const addTaskBoard = () => {

    taskBoard.textContent= ""

    const buttonDiv = document.createElement("div")
    buttonDiv.setAttribute("id", "addTaskButton")
    buttonDiv.setAttribute("data-action", "openNewTaskPopUp")

    const addTaskButton = document.createElement("button")
    addTaskButton.innerText = "Add Task"
    addTaskButton.classList.add("whiteText")
    
    const addLogo = document.createElement("div")
    addLogo.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Add_Plus"> <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>`
    
    buttonDiv.append(addTaskButton,addLogo)
    taskBoard.appendChild(buttonDiv)
    mainDiv.appendChild(taskBoard)

}


const loadTaskCard= (task) => {
    
    const taskDiv = document.createElement("div")
    taskDiv.classList.add("taskCard")
    taskDiv.setAttribute("data-taskId",task.id)

    const toggleCheckDiv = document.createElement("div")
    toggleCheckDiv.classList.add("toggleCheck")
    toggleCheckDiv.setAttribute("data-action","toggleCheckTask")
    toggleCheckDiv.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`

    if (task.check == "on"){
        toggleCheckDiv.classList.add("checked")
        taskDiv.classList.add("completedTask")

    }
    
    const taskName = document.createElement("h3")
    taskName.innerText = task.name
    taskName.classList.add("taskName")

    const taskPriority = document.createElement("h4")
    taskPriority.innerText = task.priority
    taskPriority.classList.add("taskPriority")
    
    const taskDate = document.createElement("h4")
    taskDate.innerText = task.date
    taskDate.classList.add("taskDate")

    const actionButtons = document.createElement("div")
    actionButtons.classList.add("taskActionButtons")

    const editButton = document.createElement("div")
    editButton.innerHTML=`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`
    editButton.classList.add("taskActionLogo")
    editButton.setAttribute("data-action", "editTask")

    const deleteButton = document.createElement("div")
    deleteButton.innerHTML=`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 7H20" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 7V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V7" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`
    deleteButton.classList.add("taskActionLogo")
    deleteButton.setAttribute("data-action", "deleteTask")

    actionButtons.append(editButton, deleteButton)

    taskDiv.append(toggleCheckDiv,taskName,taskPriority, taskDate, actionButtons)
    
    taskBoard.appendChild(taskDiv)
}

const loadDataToModal= (taskId) =>{

    const task = dataManager().getDataById(taskId)

    document.querySelector("#updateTaskForm>#taskNameInput").value = task.name
    document.querySelector("#updateTaskForm>#taskDateInput").value = task.date
    document.querySelector("#updateTaskForm>#taskListInput").value = task.listName
    
    switch (task.priority){

        case "medium":
            document.querySelector("priorityInputLMid").checked = true
            break
        
        case "low":
            document.querySelector("priorityInputLow").checked = true
            break
        
        case "high":
            document.querySelector("priorityInputLHigh").checked = true
            break

    }

    document.querySelector("#updateTask").setAttribute("data-taskId", taskId)

}

const updateTaskUI= (e, taskId) =>{

    e.target.closest(".toggleCheck")?.classList.toggle("checked")           //e.target can be the SVG sometimes, so we target the closest element with .toggleCheck
    document.querySelector(`[data-taskid="${taskId}"]`).classList.toggle("completedTask")

}

export {loadTaskCard, addTaskBoard, printHeader, loadDataToModal, updateTaskUI}