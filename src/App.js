import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuid } from 'uuid';
import {Button } from 'react-bootstrap';
import 'moment-timezone';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';



const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([]) 
  const todoNameRef = useRef()
  

/*Strict mode makes it so that the page refreshes two times. Note to future self: Delete the strict mode wrapper!!!*/
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])


  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    console.log(name)
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuid(), name: name, complete: false, time: new Date().toLocaleString()}]
    }) 
    todoNameRef.current.value = null
  }
  function handleClearTodos() {
    const newTodos = todos.filter(todos => !todos.complete)
    setTodos(newTodos)
  }
  
  return (
    <>
      <header className='App-header justify-content-center'>
        <h1 className='text-center'>Todo-list</h1>
      </header>
      <Container className="contact-content">

          <Stack direction="horizontal" gap={3} className="justify-content-center">
            <input ref={todoNameRef} placeholder="Write a todo"  type ="text"></input>
            <Button onClick={handleAddTodo}>Add</Button>
          </Stack>
          <Row className="content-justify-end">
            <Col className=" text-end">
              <TodoList todos = {todos} toggleTodo={toggleTodo}/>
            </Col>
            <Col className='align-self-center'>
              <div><n className="fw-bold">{todos.filter(todo => !todo.complete).length}</n> things left todo</div>
              <Button onClick={handleClearTodos} variant="success">Clear completed</Button>
            </Col>
          </Row>
      </Container>

      
    </>
  );
};

export default App;
