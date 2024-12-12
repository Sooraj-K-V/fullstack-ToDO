import { Fragment, useState } from "react";
import "./App.css";
import React from "react";
import InputTodo from "./components/inputTodo";
import ListTodo from "./components/ListTodo";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListTodo />
      </div>
    </Fragment>
  );
}

export default App;
