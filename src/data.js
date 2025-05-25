class Task {

    static alltasks= []

    static deleteTask(task){
        Task.alltasks = Task.alltasks.filter(element =>element != task)        //method is static because it updates to allList araay is a class-level concern (not specific to an instance)
    }
    
    constructor (title, date,priority,listName,checklist) {
        this.title=title
        this.date=date
        this.priority=priority
        this.checklist=checklist
        this.listName=listName
        this.id=crypto.randomUUID()
        Task.alltasks.push(this)
    }

}


class TaskList {

    static allLists= []      

    static deleteList(listId){
        TaskList.allLists = TaskList.allLists.filter(element => element != TaskList.getListObj(listId))                        //method is static because it updates to allList araay is a class-level concern (not specific to an instance)
    }

    static getListObj(listId){
        const list = TaskList.allLists.find(object => object.id == listId)
        return list
    }

    constructor(name) {
        this.name = name
        this.tasks = []
        this.id=crypto.randomUUID()
        TaskList.allLists.push(this)
    }

    removeTaskFromList(task){

        this.tasks = this.tasks.filter(element =>element != task)           //delete from List specific array

    }

    addTasktoList(task){
        this.tasks.push(task)
    }

}



const taskManager = () =>{






}

export {Task, TaskList} 