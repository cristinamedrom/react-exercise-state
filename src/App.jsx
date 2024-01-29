import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div>
      <span style={{ textDecoration: task.isDone ? 'line-through' : 'none' }}>{task.description}</span>
      <input type="checkbox" checked={task.isDone} onChange={() => onToggle(task._id)} />
      <button className='buttonX' onClick={() => onDelete(task._id)}>x</button>
    </div>
  );
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleEnterPress = (event) => {
    if (event.key === 'Enter' && newTask.trim() !== '') {
      event.preventDefault();
      const newTaskObj = {
        description: newTask,
        isDone: false,
        _id: tasks.length + 1,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  const handleToggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  return (
    <div>
      <h1>Lista de frustrantes tareas por hacer</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Nueva frustración"
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={handleEnterPress}
        />
      </form>
      <div>
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default App
