import { useState, useEffect } from 'react'
import './App.css';


function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      return JSON.parse(savedTodos)
    } else {
      return []
    }
  })
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      }
      setTodos([...todos, newTodo])
      setInputValue('')
    }
  }

  const handleDelete = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const toggleStatus = (id) => {
    const newTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    setTodos(newTodos)
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleInputChange} 
          placeholder="Enter a new todo"
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text} - 
            {todo.completed ? 'Completed' : 'Not Completed'}
            <button onClick={() => toggleStatus(todo.id)}>Toggle Status</button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
