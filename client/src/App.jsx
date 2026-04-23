import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    getTodos()
  }, [])

  async function getTodos() {
    const { data, error } = await supabase
      .from('todos')
      .select('*')

    if (error) {
      console.error('Error fetching todos:', error)
    } else {
      setTodos(data)
      console.log('Supabase working:', data)
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Supabase Test</h1>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  )
}

export default App