import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  const addTask = () => {
    axios.post('http://localhost:5000/tasks', { task })
      .then(res => setTasks([...tasks, res.data]))
      .catch(err => console.error(err));
    setTask('');
  };

  const deleteTask = id => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => setTasks(tasks.filter(t => t._id !== id)))
      .catch(err => console.error(err));
  };

  const toggleTask = id => {
    axios.put(`http://localhost:5000/tasks/${id}`)
      .then(res => {
        const updatedTasks = tasks.map(t => 
          t._id === id ? res.data : t
        );
        setTasks(updatedTasks);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <input 
        type="text" 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map(t => (
          <li key={t._id}>
            <span 
              style={{ textDecoration: t.completed ? 'line-through' : '' }}
              onClick={() => toggleTask(t._id)}
            >
              {t.task}
            </span>
            <button onClick={() => deleteTask(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
