import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@mui/material/Button";
import { TodoState } from "./context/TodoContext";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Todos = () => {
  const classes = useStyles();
  const { changeStatusFun, filteredTodos, currentPage, todosPerPage, search } =
    TodoState();

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  return (
    <div>
      <Grid container spacing={10}>
        {currentTodos &&
          currentTodos
            .filter(
              (obj) =>
                obj.title.toLowerCase().includes(search.toLowerCase()) ||
                obj.content.toLowerCase().includes(search.toLowerCase())
            )
            .map((todo) => (
              <Grid key={todo.id} item xs={10}>
                <Card className={classes.root}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textPrimary"
                      gutterBottom
                    >
                      {todo.title}
                    </Typography>
                    <Typography
                      className={classes.content}
                      color="textPrimary"
                      gutterBottom
                    >
                      {todo.content}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {new Date(todo.creationTime).toLocaleDateString()}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {todo.status}
                    </Typography>
                    {todo.status === "Active" && (
                      <Button
                        variant="contained"
                        onClick={() => changeStatusFun(todo.id)}
                      >
                        Task completed
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>
    </div>
  );
};

export default Todos;
