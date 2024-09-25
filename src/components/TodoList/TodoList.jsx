import React, { useState } from "react";
import TodoItem from "./TodoItem/TodoItem.jsx";
import "./TodoList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
const TodoList = (props) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending

  const filteredTodoList = props.todoList
    .filter((task) => {
      const taskDate = task.dueDate.toISOString().split("T")[0];
      return (
        (!startDate || taskDate >= startDate) &&
        (!endDate || taskDate <= endDate)
      );
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else {
        return new Date(b.dueDate) - new Date(a.dueDate);
      }
    });

  const clearDates = () => {
    setStartDate("");
    setEndDate("");
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div>
      <div className="filter-con">
        <label>Start </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label> End </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button className="btn-danger" onClick={clearDates}>
          Clear Dates
        </button>
        <button onClick={toggleSortOrder}>
          <FontAwesomeIcon icon={faSort} /> Date (
          {sortOrder === "asc" ? "Ascending" : "Descending"})
        </button>
      </div>
      <ul className="todolist-con">
        {filteredTodoList.length === 0 ? (
          <h2 style={{ color: "red" }}>No tasks found</h2>
        ) : null}
        {filteredTodoList.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            task={todo.task}
            dueDate={todo.dueDate}
            isFinished={todo.isFinished}
            deleteTask={props.deleteTask}
            updateTask={props.updateTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
