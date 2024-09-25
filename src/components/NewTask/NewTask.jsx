import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./NewTask.css";
const NewTask = (props) => {
  const toDay = new Date().toISOString().split("T")[0];
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState(toDay);
  const taskInputRef = useRef(null);

  useEffect(() => {
    taskInputRef.current.focus();
  }, []);
  const onTaskChanged = (e) => {
    setTask(e.target.value);
  };

  const onDateChanged = (e) => {
    setDueDate(e.target.value);
  };
  const onAddTask = () => {
    if (task && dueDate) {
      props.addTask({ task, dueDate: new Date(dueDate), isFinished: false });
      setTask("");
      setDueDate(toDay);
      taskInputRef.current.focus();
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onAddTask();
    }
  };
  return (
    <div className="newtask-con">
      <input
        type="text"
        placeholder="Add a new task"
        value={task}
        onChange={onTaskChanged}
        onKeyDown={handleKeyDown}
        ref={taskInputRef}
      />
      <input type="date" value={dueDate} onChange={onDateChanged} />
      <button onClick={onAddTask}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default NewTask;
