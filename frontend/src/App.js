import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const getTasks = () => {
    fetch("http://localhost:8000/tasks/")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getTasks();
  }, []);

  const createTask = () => {
    if (!title) return;

    fetch("http://localhost:8000/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .then(() => {
        setTitle("");
        getTasks();
      })
      .catch((err) => console.error(err));
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:8000/tasks/${id}`, {
      method: "DELETE",
    }).then(() => getTasks());
  };

  const completeTask = (id) => {
    fetch(`http://localhost:8000/tasks/${id}/complete`, {
      method: "PUT",
    }).then(() => getTasks());
  };

  return (
    <div className="container">
      <h1>📝 Lista de tareas</h1>

      <div className="input-group">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nueva tarea..."
        />
        <button onClick={createTask}>Agregar</button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <span className={task.completed ? "completed" : ""}>
              {task.title}
            </span>

            <div className="actions">
              <button onClick={() => completeTask(task.id)}>✔</button>
              <button onClick={() => deleteTask(task.id)}>🗑</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;