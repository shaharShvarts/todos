const { createContext, useContext, useState, useEffect } = require("react");

const Todo = createContext();

const TodoContext = ({ children }) => {
  const localUser = JSON.parse(localStorage.getItem("local_todos")) || [];
  const [todos, setTodos] = useState(localUser);
  const [search, setSearch] = useState("");

  const expertise = localStorage.getItem("expertise") || "Results";

  const [filteredTodos, setFilteredTodos] = useState(
    todos.filter((todo) => todo.type === expertise)
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [dueDate, setDueDate] = useState("asc");
  const todosPerPage = 5;
  const totalTodos = filteredTodos.length;

  useEffect(() => {
    if (todos.length === 0) {
      const callApi = async () => {
        const response = await fetch("/api/todos");
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        localStorage.setItem("local_todos", JSON.stringify(body));
        setTodos(body);
      };
      callApi();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (dueDate === "") return;
    const sortedArr = todos.sort((a, b) =>
      new Date(a.dueDate).toLocaleDateString() >
      new Date(b.dueDate).toLocaleDateString()
        ? 1
        : -1
    );
    setTodos([...sortedArr]);
    sortFun("Active");
    // eslint-disable-next-line
  }, [dueDate]);

  const sortFun = (selected) => {
    const sortedArr = todos.sort((a, b) =>
      a.status === selected ? -1 : b.status === selected ? 1 : 0
    );
    setTodos([...sortedArr]);
  };

  const orderByStatusFun = (e) => {
    sortFun(e.target.value);
  };

  const changeStatusFun = (id) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, status: "Done" } : todo
    );

    const sortedArr = newTodo.sort((a, b) =>
      a.status === "Active" ? -1 : b.status === "Done" ? 1 : 0
    );

    setTodos([...sortedArr]);
  };

  const orderByTypeFun = (e) => {
    setFilteredTodos(() =>
      todos.filter((todo) => todo.type === e.target.value)
    );
    localStorage.setItem("expertise", e.target.value);
    setCurrentPage(1);
  };

  return (
    <Todo.Provider
      value={{
        changeStatusFun,
        orderByStatusFun,
        orderByTypeFun,
        filteredTodos,
        currentPage,
        setCurrentPage,
        dueDate,
        setDueDate,
        setSearch,
        search,
        totalTodos,
        todosPerPage,
      }}
    >
      {children}
    </Todo.Provider>
  );
};

export default TodoContext;

export const TodoState = () => {
  return useContext(Todo);
};
