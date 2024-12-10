import { useState, useEffect } from "react";
import Input from "../components/input";
import ToDosList from "../components/todosList";
import "../styles/tasks.css";
import { getTasks } from "../utils/localStorageUtils";
import { Todo } from "../interfaces/Todo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Fetch tasks initially when the component mounts
  useEffect(() => {
    const localTodoList = getTasks();
    setTodos(localTodoList);
  }, []);

  // Update the task list when a new task is added
  const onTaskAdded = () => {
    const updatedTasks = getTasks(); 
    setTodos(updatedTasks);
  };

  return (
    <div className="appContainer">
      {/* Component for adding tasks input by the user and saving them to localStorage */}
      <Input addedTask={onTaskAdded} />

      {/* Component to display the list of tasks fetched from the API and tasks added by the user */}
      <ToDosList todos={todos} setTodos={setTodos} />

      {/* Component to display success messages */}
      <ToastContainer />
    </div>
  );
}

export default App;
