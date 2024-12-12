import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";
import pkg from "pg";
const { Pool } = pkg;

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json()); //req.body

const resetId = () => {
  pool.query(
    `WITH updated AS (
    SELECT todo_id, row_number() OVER (ORDER BY todo_id) AS new_id
    FROM todo
    )
    UPDATE todo
    SET todo_id = updated.new_id
    FROM updated
    WHERE todo.todo_id = updated.todo_id;`
  )
}

//routes:

// 1 . Create a todo
app.post("/todos", async (req, res) => {
  try {
    console.log(req.body);
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    resetId();

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get specific todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(
      "SELECT description FROM todo WHERE todo_id=$1",
      [id]
    );
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    resetId();

    res.json("Todo is updated");
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);

    resetId();

    res.json("Successfully deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`server running on port https://localhost:${port}/`);
});
