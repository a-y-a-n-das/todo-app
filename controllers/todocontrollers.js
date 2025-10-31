
class Todo{
    constructor(id, text, completed = false){
        this.id = id;
        this.text = text;
        this.completed = completed;
    }
}
let todosList= [];

function getTodos(req, res){
    res.send(todosList);
}

function addTodo(req, res){
    if(req.body.text != ""){
        const td = new Todo(Date.now(), req.body.text);
        todosList.push(td);
        res.status(201).send({ message: "Todo created", todo: td });
    }
    else{
        res.status(400).send({ error: "Text cannot be empty" });
        return
    }
}

function deleteTodo(req, res){
    const idToDelete = req.body.idToDelete;
    const index = todosList.findIndex(t => t.id == idToDelete);
    if(index == -1){
        res.send({message: "todo doesn't exists!"})
        return
    }
    todosList.splice(index, 1);
    res.send({message: "todo Deleted!"});
}

function completeTodo(req, res){
    const idToComplete = req.body.idToComplete;
    const index = todosList.findIndex(t => t.id == idToComplete);
    if(index == -1){
        res.send({message: "todo doesn't exists!"})
    return
    }
    todosList[index].completed ==true ? todosList[index].completed=false : todosList[index].completed =true  ;

    res.send({message: "todo Marked Completed!"})    
}

module.exports = { getTodos, addTodo, deleteTodo, completeTodo };
