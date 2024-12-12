import React, { Fragment, useState } from "react";
import axios from "axios";
import "../components/comp.css"

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();

    // Check if description is empty or just spaces
    if (!description.trim()) {
      alert("Please enter a valid description");
      return; // Prevent submitting if the description is empty
    }

    try {
      const body = { description };
      const response = await axios.post("http://localhost:5000/todos", body);

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">PERN ToDo List</h1>
      <form action="" className="d-flex  mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control mx-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-primary mx-1" onClick={onSubmitForm} style={{backgroundColor: "#00ADB5", color: "white"}}>
          add
        </button>
      </form>
    </Fragment>
  );
};
export default InputTodo;
