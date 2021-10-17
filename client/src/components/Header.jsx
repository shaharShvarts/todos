import Button from "@mui/material/Button";
import { TodoState } from "./context/TodoContext";

const Header = () => {
  const { dueDate, setDueDate, orderByStatusFun, orderByTypeFun } = TodoState();

  return (
    <header style={Css.flex}>
      <label htmlFor="status">order by status : </label>

      <select id="status" style={Css.list} onChange={orderByStatusFun}>
        <option value="Active">Active</option>
        <option value="Done">Done</option>
      </select>
      <Button
        variant="outlined"
        onClick={() => setDueDate(dueDate === "asc" ? "desc" : "asc")}
      >
        Sort by date : {dueDate}
      </Button>
      <select id="status" style={Css.list} onChange={orderByTypeFun}>
        <option value="Results">Results</option>
        <option value="Wins">Wins</option>
        <option value="Withdraw">Withdraw</option>
      </select>
    </header>
  );
};

const Css = {
  flex: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  list: {
    display: "block",
    height: 35,
    width: 250,
    padding: 5,
  },
};

export default Header;
