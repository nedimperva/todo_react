import React, { useState, useEffect } from "react";
import "./App.css";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import useRandomQuote from "./components/useRandomQuote";
import Todo from "./components/Todo";
import FormTodo from "./components/FormTodo";

function App() {
  const [todos, setTodos] = useState([
    {
      text: "This is a sampe todo",
      isDone: false,
    },
  ]);

  useEffect(() => {
    const data = window.localStorage.getItem("savedTodos");
    if (data !== null) setTodos(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("savedTodos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const markTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const quote = useRandomQuote();

  return (
    <div className="app">
      <div className="container">
        <div class="card border-0">
          <div>
            <h3 className="blockquote m-3 text-center">{quote.text}</h3>
            <h5 className="blockquote-footer m-3 text-center">
              {quote.author}
            </h5>
          </div>
        </div>
        <h1 className="text-center m-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Card>
              <Card.Body>
                <Todo
                  key={index}
                  index={index}
                  todo={todo}
                  markTodo={markTodo}
                  removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
