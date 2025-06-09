
const addListTab = (list)=>{
    
    const newListTab = document.createElement("button")
    newListTab.innerText =  list.name
    newListTab.classList.add("tab", "greyText")
    newListTab.setAttribute("data-listId", list.id)
    newListTab.setAttribute("data-action", "renderListPage")
    
    const deleteLogo = document.createElement("div")
    deleteLogo.innerHTML=`<svg width=9px height=9px viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 21.32L21 3.32001" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 3.32001L21 21.32" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`

    deleteLogo.setAttribute("data-action", "deleteListTab")

    const tabDiv = document.createElement("div")
    tabDiv.setAttribute("data-listId", list.id)
    tabDiv.classList.add("tab")

    tabDiv.append(newListTab, deleteLogo)
    document.querySelector("#sidebar").appendChild(tabDiv)
}


const deleteListTab = (listId) =>{
    const listDiv = document.querySelector(`[data-listId="${listId}"]`)
    listDiv.remove()
}

export {addListTab, deleteListTab}
