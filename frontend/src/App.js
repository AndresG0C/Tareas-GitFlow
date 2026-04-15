import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const getTasks = () => {
    fetch("http://localhost:8000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getTasks();
  }, []);

  const createTask = () => {
    if (!title) return;

    fetch("http://localhost:8000/tasks", {
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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista de tareas</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button onClick={createTask}>Agregar</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;