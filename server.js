const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors());
app.use(express.json());
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/toDoApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(console.log('database connected')).catch((error) => {
    console.log(error)
})
const Todo=require("./models")

app.get('/todos',async function(req,res){
    let todos= await Todo.find()
    res.json(todos)
 



})
app.post('/todo/new', function(req,res){
    const todo= new Todo({
        text:req.body.text
    })
    todo.save()

res.json(todo)
})
app.delete('/todo/delete/:id',async function(req,res){
    console.log(req.params.id)

    const result=await Todo.findByIdAndDelete(req.params.id)
 
    res.json(result)
   


})
app.get('/todo/complete/:id',async function(req,res){
    var todo=await Todo.findById(req.params.id)
    todo.complete=!todo.complete
    todo.save()
    res.json(todo)
})



app.listen(5000, console.log('server running port 5000'))