import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import "./TodoItem.css";

const TodoItem = (props) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(props.task);
  const [updatedDueDate, setUpdatedDueDate] = useState(
    props.dueDate.toISOString().split("T")[0]
  );
  useEffect(() => {
    if (isUpdated) {
      setUpdatedTask(props.task);
      setUpdatedDueDate(props.dueDate.toISOString().split("T")[0]);
    }
  }, [isUpdated, props.task, props.dueDate]);
  const handleUpdate = () => {
    props.updateTask({
      id: props.id,
      task: updatedTask,
      dueDate: new Date(updatedDueDate),
      isFinished: props.isFinished,
    });
    setIsUpdated(false);
  };

  const handleToggleFinished = () => {
    props.updateTask({
      id: props.id,
      task: props.task,
      dueDate: props.dueDate,
      isFinished: !props.isFinished,
    });
  };

  return (
    <li>
      {isUpdated ? (
        <div className="input-group">
          <input
            type="text"
            value={updatedTask}
            onChange={(e) => setUpdatedTask(e.target.value)}
          />
          <input
            type="date"
            value={updatedDueDate}
            onChange={(e) => setUpdatedDueDate(e.target.value)}
          />
          <button
            onClick={handleUpdate}
            disabled={!updatedTask || !updatedDueDate || !updatedTask.trim()}
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button onClick={() => setIsUpdated(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      ) : (
        <div>
          <div className="checkbox-wrapper-6">
            <div className="chk-con">
              <input
                type="checkbox"
                checked={props.isFinished}
                onChange={handleToggleFinished}
                className="tgl tgl-light"
                id={`checkbox-${props.id}`}
              />
              <label
                className="tgl-btn"
                htmlFor={`checkbox-${props.id}`}
              ></label>
            </div>
            <span
              className="task"
              style={{
                textDecoration: props.isFinished ? "line-through" : "none",
              }}
            >
              {props.task}
            </span>{" "}
            Due Date: {new Date(props.dueDate).toLocaleDateString("en-GB")}
            <button onClick={() => setIsUpdated(true)}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button onClick={() => props.deleteTask(props.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
