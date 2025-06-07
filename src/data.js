import { format, add, isAfter} from "date-fns"

class Task {
    
    constructor (name, date,priority,listName="Personal") {
        this.name=name
        this.date=date
        this.priority=priority
        this.check="off"
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

        this.tasks = this.tasks.filter(element =>element.id != task.id)           //delete from List specific array

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
        
        let haveFoundList = false

        for (let i=0; i< localStorage.length; i+=1){
            const key = localStorage.key(i)
            const value = JSON.parse(localStorage.getItem(key))

            if (value.type == "taskList" && value.name==taskListName) {
                haveFoundList = true
                return value
                }
        }
        if (haveFoundList == false) return null   
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

    const getWeekTasks = () =>{
        let array = [] 
        const todayDate = format (new Date(), 'yyyy-MM-dd')
        const thresholdDate = add(todayDate,{days:7})

        for (let i=0; i< localStorage.length; i+=1){
            const key = localStorage.key(i)
            const value = JSON.parse(localStorage.getItem(key))
            
            if (!(isAfter(value.date, thresholdDate)) && value.type == "task") {array.push(value)}
            }
        return array
                
    }
 
    const getAllLists = () =>{
        let array = [] 

        for (let i=0; i< localStorage.length; i+=1){
            const key = localStorage.key(i)
            const value = JSON.parse(localStorage.getItem(key))
            
            if (value.type == "taskList") {array.push(value)}
            }
        return array
    }       



return {saveToStorage,getDataById, deleteDataById, getDataByListName, getAllTasks, getAllLists, getWeekTasks}

}

export {Task, TaskList, dataManager} 