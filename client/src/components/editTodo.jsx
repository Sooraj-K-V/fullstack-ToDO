import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import "../components/comp.css";

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await axios.put(
        `http://localhost:5000/todos/${todo.todo_id}`,
        body
      );
      console.log(response.data);
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        style={{ backgroundColor: "#00ADB5", color: "white" }}
        type="button"
        className="btn p-1"
        data-bs-toggle="modal"
        data-bs-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id={`id${todo.todo_id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        onClick={() => setDescription(todo.description)}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content" style={{ backgroundColor: "#222831" }}>
            <div className="modal-header">
              <h5
                className="modal-title"
                id="exampleModalLabel"
                style={{ color: "cyan" }}
              >
                Edit Todo
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ backgroundColor: "red"}}
                onClick={() => setDescription(todo.description)}
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={(e) => updateDescription(e)}
                style={{ backgroundColor: "#039bb3" }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
