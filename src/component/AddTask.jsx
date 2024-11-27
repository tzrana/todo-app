import React, { useState } from "react";

function AddTasks() {
  // State to store the list of tasks
  const [tasks, setTasks] = useState([]);
  
  // State to store the current task input
  const [taskInput, setTaskInput] = useState("");
  
  // State to track which task is being edited
  const [editingId, setEditingId] = useState(null);

  // Function to add a new task
  const handleAddTask = () => {
    // Prevent adding an empty task
    if (taskInput.trim() === "") return;

  
    // Add the new task to the list with a unique ID (using Date.now() for simplicity)
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), text: taskInput, completed: false },
    ]);
    
    // Clear the task input after adding
    setTaskInput("");
  };

  // Function to mark a task as completed
  const handleMarkCompleted = (taskId) => {
    // Update the task to mark it as completed
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
  };

  // Function to delete a task
  const handleDeleteTask = (taskId) => {
    // Remove the task from the list by filtering out the task with the given ID
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Function to edit a task
  const handleEditTask = (taskId, newText) => {
    // Update the text of the task with the new text
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, text: newText } : task
      )
    );
    
    // Exit the edit mode after saving the changes
    setEditingId(null);
  };

  // Function to cancel editing
  const handleCancelEdit = () => {
    // Reset editing mode without saving any changes
    setEditingId(null);
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      {/* Input for adding a new task */}
      <div className="mb-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Add a Task</h3>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter task"
          />
          <button
            onClick={handleAddTask}

            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>

      {/* List of tasks (incomplete tasks first) */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">List of Tasks:</h3>
        <ul className="space-y-2">
          {tasks
            .filter((task) => !task.completed)
            .map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm"
              >
                {editingId === task.id ? (
                  <>
                    <input
                      type="text"
                      defaultValue={task.text}
                      onChange={(e) => setTaskInput(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <div className="ml-4 flex space-x-2">
                      <button
                        onClick={() => handleEditTask(task.id, taskInput)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      >
                        Done
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="flex-grow">{task.text}</span>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleMarkCompleted(task.id)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                      >
                        Mark Completed
                      </button>
                      <button
                        onClick={() => setEditingId(task.id)}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
        </ul>
      </div>

      {/* List of completed tasks */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Completed Tasks:</h3>
        <ul className="space-y-2">
          {tasks
            .filter((task) => task.completed)
            .map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm"
              >
                <span className="flex-grow">{task.text}</span>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default AddTasks;
