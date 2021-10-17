import { makeStyles } from "@material-ui/core/styles";

import Header from "./components/Header";
import TodosSection from "./components/TodosSection";
import Pagination from "./components/Pagination";

import { TodoState } from "./components/context/TodoContext";

import "./App.css";
import SearchBar from "./components/SearchBar";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function App() {
  const classes = useStyles();

  const { totalTodos, todosPerPage } = TodoState();

  // const changeDateOrder = () => {};

  return (
    <div className={classes.root}>
      <Header />
      <SearchBar />
      <TodosSection />
      {totalTodos && totalTodos > todosPerPage && <Pagination />}
    </div>
  );
}

export default App;
