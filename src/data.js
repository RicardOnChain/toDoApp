class Task {
    
    constructor (title, date,priority,listName="Personal") {
        this.title=title
        this.date=date
        this.priority=priority
        this.checklist="off"
        this.listName=listName
        this.type = "task"
        this.id=crypto.randomUUID()
    }

}


class TaskList {

    constructor(name) {
        this.name = name
        this.tasks = []
        this.type = "taskList"
        this.id=crypto.randomUUID()
    }

    removeTaskFromList(task){

        this.tasks = this.tasks.filter(element =>element != task)           //delete from List specific array

    }

    addTasktoList(task){
        this.tasks.push(task)
    }

}



const dataManager = () =>{

    const saveToStorage = (data) => {
    
            localStorage.setItem(data.id,JSON.stringify(data))
            
        }
   
        
    const getDataById = (id) => {
        const data = localStorage.getItem(id) 
        return (JSON.parse(data))
    }
    

    const deleteDataById = (id) => {
        localStorage.removeItem(id)

    }

    const getDataByListName = (taskListName) => {

        for (let i=0; i< localStorage.length; i+=1){
            const key = localStorage.key(i)
            const value = JSON.parse(localStorage.getItem(key))

            if (value.type != "task" && value.name==taskListName) 
                return value.tasks
            
        }
    }

    const getAllTasks = () =>{
        let array = [] 

        for (let i=0; i< localStorage.length; i+=1){
            const key = localStorage.key(i)
            const value = JSON.parse(localStorage.getItem(key))
            
            if (value.type == "task") {array.push(value)}
            }
        return array
    }       


return {saveToStorage,getDataById, deleteDataById, getDataByListName, getAllTasks}

}

export {Task, TaskList, dataManager} 