import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header/Header.jsx";
import TodoList from "./components/TodoList/TodoList.jsx";
import NewTask from "./components/NewTask/NewTask.jsx";
let lastId = 4;
function App() {
  const todoListData = [
    {
      id: 1,
      task: "Sample Task ...",
      dueDate: new Date(),
      isFinished: false,
    },
  ];
  const [todoList, setTodoList] = useState(todoListData);
  const [welcome, setWelcome] = useState("To-Do List");
  const [showAuthor, setShowAuthor] = useState(false);
  const addTask = (task) => {
    const newTask = { ...task, id: ++lastId };
    setTodoList([...todoList, newTask]);
  };
  const deleteTask = (taskId) => {
    const updatedTodoList = todoList.filter((task) => task.id !== taskId);
    setTodoList(updatedTodoList);
  };
  const updateTask = (updatedTask) => {
    const updatedTodoList = todoList.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTodoList(updatedTodoList);
  };
  return (
    <div className="App">
      <Header txt={welcome} />
      <NewTask addTask={addTask} />
      <TodoList
        todoList={todoList}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
      <button
        className="toggle-author"
        onClick={() => setShowAuthor(!showAuthor)}
      >
        Author
      </button>
      <div className={`author ${showAuthor ? "show" : ""}`}>
        panja.sasithonwan@gmail.com
      </div>
    </div>
  );
}

export default App;
