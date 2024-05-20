const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

let tasks = []; // Array to store tasks

app.use(cors());
app.use(express.json());

// Endpoint to add a new task
app.post('/addlist', (req, res) => {
    const { id, task, completed } = req.body;
    console.log("request ",req.body);
    tasks.push({ id, task, completed });
    console.log("add list",tasks);
    res.json({ message: 'Task added successfully' });
});

// Endpoint to get all tasks
app.get('/getlist', (req, res) => {
    // console.log("give list");
    res.json(tasks);
});

// Endpoint to delete a task by ID
app.delete('/deletetask/:id', (req, res) => {
    const id = req.params.id;
    tasks = tasks.filter(task => task.id !== parseInt(id));
    res.json({ message: 'Task deleted successfully' });
});

// Endpoint to update a task by ID
app.put('/updatetask/:id', (req, res) => {
    const id = req.params.id;
    const { task } = req.body;
    const index = tasks.findIndex(task => task.id === parseInt(id));
    if (index !== -1) {
        tasks[index].task = task;
        res.json({ message: 'Task updated successfully' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Endpoint to change task status by ID
app.put('/changeStatus/:id', (req, res) => {
    const id = req.params.id;
    const taskStatus = req.body.taskStatus;
    console.log("request from status update",req.body.taskStatus);
    console.log("id",id);
    console.log("taskstatus",taskStatus);

    let update =tasks.find(task=>task.id==id);
    if(update){
        update.completed=taskStatus;
        console.log("update after status updated",update);
        console.log("task after status updated",tasks)
    }
res.send('Sucessfully updated ')
    // const index = tasks.findIndex(task => task.id === parseInt(id));
    // if (index !== -1) {
    //     tasks[index].completed = taskStatus;
    //     console.log(" if log from change status ",res.data);
    //     res.json({ message: 'Task status updated successfully' });
    // } else {
    //     console.log("else log from change status ",res.data); 
    //     res.status(404).json({ message: 'Task not found' });
    // }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `);
});
