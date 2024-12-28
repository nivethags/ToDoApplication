import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import '../CSS/style.css'
const Todo = () => {
    const [work, setWork] = useState({ text: '', status: false });
    const [conformation, setConformation] = useState('');
    const [update, setUpdate] = useState(false);
    const [result, setResult] = useState([]);
    const [id, setId] = useState();
    const [updateData, setUpdateData] = useState({ id: null, task: '' });
    const addTask = (e) => {
        e.preventDefault();

        const newId = result.length === 0 ? 1 : result[result.length - 1].id + 1;
        setId(newId);
        console.log(newId);
        axios.post('http://localhost:5000/addlist', { id: newId, task: work.text, completed: work.status })
            .then(res => {
                setConformation(res.data.message);
                alert("your task was added!")
            })
            .catch(err => console.log(err));
        setWork({ text: ' ' })
    }

    useEffect(() => {
        axios.get('http://localhost:5000/getlist')
            .then(res => { setResult(res.data) })
            .catch(err => { console.log(err); })
    })

    const removeTask = (id) => {
        console.log(id);
        axios.delete(`http://localhost:5000/deletetask/${id}`)
            .then(res => {
                console.log(res);
                // setResult(res.data);
            })
            .catch(err => console.log(err));
    };

    const TaskUpdate = (id) => {
        // setUpdate(true);
        // e.preventDefault();
        console.log(id);
        console.log("updatetask", updateData);
        axios.put(`http://localhost:5000/updatetask/${id}`, { task: updateData.task })
            .then(res => { console.log(res.data); })
            .catch(err => { console.log(err); })
    }

    const changeStatus = (id) => {
        const task = result.find(task => task.id === id);
        if (task) {
            axios.put(`http://localhost:5000/changeStatus/${id}`, { taskStatus: !task.completed })
                .then(res => {
                    console.log(res.data);
                    // Update the UI after success
                    setResult(result.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className='todo-container'>
            <div className="form" style={{ display: 'flex',marginTop:'2%',paddingTop:'2%', columnGap: '4%', width: 'fitContent', justifyContent: 'center' }}>
                <input type="text" name="" id="" value={work.text} className='todotext' placeholder='enter your Todo' onChange={e => setWork({ ...work, text: e.target.value })} />
                <button className='addlist' onClick={addTask} >Add</button>
            </div>
            <div>
                <table style={{ width: '100%' }}>

                    <tr >
                        <th>Task</th>
                        <th>Status</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                    {result &&

                        <tbody style={{ width: '100%' }}>
                            {result.map((index, item) => (
                                <tr className='task'>
                                    <td>{index.task}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={index.completed}
                                            onChange={() => changeStatus(index.id)}
                                        />
                                    </td>
                                    <td> <button className='delete' onClick={() => { removeTask(index.id) }}>delete</button></td>
                                    <td> <button className='update' onClick={() => { setUpdate(true); setUpdateData({ ...updateData, id: index.id }) }}>Update</button> </td>
                                    {/* setUpdateTask({...updatetask,id:index.id}) */}
                                </tr>

                            ))}
                        </tbody>
                    }
                </table>
            </div>



            {
                update &&
                <div className="update-input " style={{ position: 'absolute', margin: 'auto', border: '1px solid black'}}>
                    <input type="text" name="" id="" value={updateData.task} onChange={e => { setUpdateData({ ...updateData, task: e.target.value})}} />
                    <div className="update-btns">
                        <button onClick={() => { TaskUpdate(updateData.id); setUpdate(false); setUpdateData({ task: ''}) }}>submit</button>
                        <button onClick={() => { setUpdate(false); setUpdateData({ task: ''}) }}>close</button>

                    </div>
                    {/* <p>{updateData.task}</p> */}
                </div>
            }

        </div>

    )
}

export default Todo
// Duplicate