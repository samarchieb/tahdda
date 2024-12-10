import { useState, useEffect } from "react";
import { Todo } from "../interfaces/Todo";


// A custom hook to save the feched data from the API into the localStorage
const useGetTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data: Todo[] = await response.json();
        setTodos(data);
        // Save fetched todos to localStorage
        localStorage.setItem("TODO_List", JSON.stringify(data));
      } catch (err) {
        setError("Error fetching todos");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return { todos, loading, error };
};

export default useGetTodos;
