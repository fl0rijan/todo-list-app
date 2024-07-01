import React, { useState, useEffect } from 'react';
import { TextInput, Button, ListItem, OrderedList, Checkbox } from '@carbon/react';
import './App.css';
import './custom.scss';

function App(){
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(() =>{
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    return savedTasks || [];
  }
  );

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      console.log('Loaded tasks from localStorage:', JSON.parse(savedTasks));
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    console.log('Saving tasks to localStorage:', tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask= () => {
    if(task.trim()){
      setTasks([...tasks,{text: task, completed: false}]);
      setTask('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const newTasks=tasks.map((task, i)=>
      i === index ? {...task, completed: !task.completed} : task);
    setTasks(newTasks); 
  };

  const deleteTask = (index) =>{
    const newTasks=tasks.filter((_,i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className='app'>
      <div className='header-text'><h1>To-Do List</h1></div>
      <div className='input-container'>
        <TextInput id="text-input"labelText="" placeholder='Add a new task' value={task} onChange={(e)=> setTask(e.target.value)}/>
        <Button kind="primary" size="sm"  onClick={addTask}>Add Task</Button>
      </div>
      <OrderedList className="task-list">
        {tasks.map((task, index) => (
          <ListItem key={index} className="list">
            <p className="number-task">{index+1}.</p>
            <Checkbox className="checkbox"
              id={`task-${index}`}
              labelText={task.text}
              checked={task.completed}
              onChange={() => toggleTaskCompletion(index)}
            />
            
            <Button kind="danger--tertiary" size="sm" onClick={() => deleteTask(index)}>Delete Task</Button>
          </ListItem>
        ))}
      </OrderedList>
    </div>
  )
}

export default App;