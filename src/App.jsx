import React, { useEffect, useRef, useState } from "react";
import Form from "./components/form";
import "./App.css";
import Tasks from "./components/tasks";
import EditForm from "./components/EditForm";

function App() {
  const [input, setInput] = useState();
  const [editInput, setEditInput] = useState();
  const [isEmpty, setIsEmpty] = useState(false);
  const [Pflag, setPflag] = useState(true);
  const [task, setTask] = useState();
  const [editFlag, setEditFlag] = useState(false);
  const [editedName, setEditedName] = useState({});
  const [change, setChange] = useState(false);
  const inputRef = useRef(0);

  let tasksInLocal;
  useEffect(() => {
    tasksInLocal = JSON.parse(localStorage.getItem("tasks")) || [];
    setTask(tasksInLocal);
  }, []);

  useEffect(() => {
    if (change) {
      localStorage.setItem("tasks", JSON.stringify(task) || null);
    }

    return () => setChange(false);
  }, [task, change]);

  const handleInput = (e) => {
    if (Pflag) {
      setInput(e.target.value);
    } else if (!Pflag) {
      setInput(e.target.value);
      setPflag(true);
    }
  };
  const handleEditInput = (e) => {
    if (Pflag) {
      setEditInput(e.target.value);
    } else if (!Pflag) {
      setInput(e.target.value);
      setPflag(true);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (input === "") {
      console.log("err");
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      let newTask = {
        id: Math.random(),
        name: input,
        isChecked: false,
      };
      setTask((prevTask) => [...prevTask, newTask]);
      setInput("");
      setPflag(false);
      handleInput;
      setChange(true);
      inputRef.current.focus();
      inputRef.current.value=""
      
    }
  };

  const handleDel = (e) => {
    const newTasks = task.filter((item) => item.id != e.target.id);
    setTask([...newTasks]);
    setChange(true);
  };

  const handleEdit = (e) => {
    setEditedName({
      id: e.target.id,
    });
    setEditFlag(true);
  };

  const handleEditButton = (e) => {
    for (let i = 0; i < task.length; i++) {
      if (task[i].id === JSON.parse(editedName.id)) {
        task[i].name = editInput;
      }
    }
    setTask([...task]);
    setEditFlag(false);
    setChange(true);
  };

  const handleBox = (e) => {
    task.map((t) => {
      if (e.target.id == t.id) {
        if (e.target.checked) {
          t.isChecked = true;
          return t;
        } else {
          t.isChecked = false;
          return t;
        }
      } else {
        return t;
      }
    });
    setTask([...task]);
    setChange(true);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="input-container">
          <h1 className="title">Todo List</h1>
          <Form
            input={input}
            inputRef={inputRef}
            task={task}
            handleInput={(e) => handleInput(e)}
            handleAdd={(e) => handleAdd(e)}
            isEmpty={isEmpty}
          />
        </div>

        <div className="tasks-container">
          <Tasks
            tasks={task}
            handleDel={(e) => handleDel(e)}
            handleEdit={(e) => handleEdit(e)}
            handleBox={(e) => handleBox(e)}
          />
        </div>

        {editFlag && (
          <EditForm
            setEditFlag={setEditFlag}
            handleInput={(e) => handleEditInput(e)}
            handleEditButton={(e) => handleEditButton(e)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
