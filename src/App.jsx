import React, { useState } from "react";
import TodoInput from "./component/AddTask"; // Assuming AddTask is your AddTasks component
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  // Function to add a new task
  const addTask = (newTask) => {
    const newTaskObj = { id: Date.now(), text: newTask, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTaskObj]);
  };

  // Function to mark a task as completed
  const markTaskCompleted = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Function to edit a task
  const editTask = (taskId, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, text: newText } : task
      )
    );
  };

  return (
    <div className="container">
      <h1>ToDo App</h1>
      {/* Pass tasks and task handling functions as props */}
      <TodoInput
        tasks={tasks}
        onAddTask={addTask}
        onMarkCompleted={markTaskCompleted}
        onDeleteTask={deleteTask}
        onEditTask={editTask}
      />
    </div>
  );
}

export default App;
