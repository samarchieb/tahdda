import { useState } from "react";
import { Todo } from "../interfaces/Todo";
import "../styles/tasks.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import Pagination from "./pagination";
import { deleteTask, getTasks, updateTaskStatus } from "../utils/localStorageUtils";
import { SuccessToast } from "../utils/toasts";

type ToDosListProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>; // Added setTodos prop
};

const ToDosList: React.FC<ToDosListProps> = ({ todos, setTodos }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20;

  // Calculate the index of the last item on the current page
  const indexOfLastTodo = currentPage * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;

  // Slice the todos array to get the items for the current page
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  // Function to handle page change
  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleUpdateStatus = (id: string) => {
    updateTaskStatus(id); // Update the task in localStorage
    setTodos(getTasks()); // Re-fetch tasks and update the state
    SuccessToast()
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id); // Delete the task from localStorage
    setTodos(getTasks()); // Re-fetch tasks and update the state
  };
  if (currentTodos.length===0){
    return <div style={{margin:'10px'}}>No task have been added to list ! </div>
  }
  return (
    <div className="listContainer">
      {currentTodos.map((todo) => (
        <div
          key={todo.id}
          className="taskContainer"
          onClick={() => handleUpdateStatus(todo.id)}
        >
          <div className="titleContainer">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleUpdateStatus(todo.id)}
            />
            <p
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "#6b6b6b" : "#333",
              }}
            >
              {todo.title}
            </p>
          </div>
          <div
            className="deleteIconContainer"
            onClick={() => handleDeleteTask(todo.id)}
          >
            <RiDeleteBin5Line />
          </div>
        </div>
      ))}
      {/* Pagination component to dipslay 20 tasks for each page  */}
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={todos.length}
        onPageChange={changePage}
      />
    </div>
  );
};

export default ToDosList;
