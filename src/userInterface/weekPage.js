const mainDiv = document.querySelector("#content")
const headerDiv = document.querySelector("#header")


const printHeader = (title) => {
    
    headerDiv.textContent=""
    
    const pageTitle= document.createElement("h2")
    pageTitle.classList.add("headerTitle")
    pageTitle.innerText= title
    headerDiv.appendChild(pageTitle)
}

const addTaskBoard = () =>{
    
    mainDiv.removeAttribute("id", "content")
    mainDiv.setAttribute("id", "contentGrid")
    
    const taskBoard = document.createElement("div")
    taskBoard.setAttribute("id","taskBoard")




}