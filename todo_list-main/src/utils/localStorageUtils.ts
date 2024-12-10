import { v4 as uuidv4 } from "uuid";
import { Todo } from "../interfaces/Todo";


// function to save new trask in the localStorage
export const addTask = (title: string) => {
  const newTodo: Todo = {
    userId: uuidv4(),
    id: uuidv4(),
    title: title,
    completed: false,
  };

  const todoList: Todo[] = JSON.parse(
    localStorage.getItem("TODO_List") || "[]"
  );

  const newList = [newTodo, ...todoList];

  localStorage.setItem("TODO_List", JSON.stringify(newList));
  return newList;
};

// function to return the list of todo tasks from the localStorage
export const getTasks = (): Todo[] => {
  const todoList = JSON.parse(localStorage.getItem("TODO_List") || "[]");
  return Array.isArray(todoList) ? todoList : [];
};

// function to update the status of the task in the loaclSrtorage
export const updateTaskStatus = (id: string) => {
  const todoList: Todo[] = JSON.parse(
    localStorage.getItem("TODO_List") || "[]"
  );
  const index = todoList.findIndex((task: Todo) => task.id === id);

  if (index !== -1) {
    todoList[index].completed = !todoList[index].completed;
    localStorage.setItem("TODO_List", JSON.stringify(todoList));
  }
};

//function to delete task from localStorage
export const deleteTask = (id: string) => {
  const todoList: Todo[] = JSON.parse(
    localStorage.getItem("TODO_List") || "[]"
  );
  const newList = todoList.filter((task: Todo) => task.id !== id);
  localStorage.setItem("TODO_List", JSON.stringify(newList));
};

