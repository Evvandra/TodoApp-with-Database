import "./App.css";
import Todo from "./pages/Todo";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/Register" element={<Register />} />
        <Route path="/Landing" element={<Landing />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/Users" element={<Users />} />
      </Routes>
    </Router>

    // <Todo />
  );
}

export default App;
