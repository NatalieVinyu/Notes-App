import React from 'react'
import Notes from './components/Notes'
import SignUp from './components/SignUp'
import LoginForm from './components/LoginForm'
import { supabase } from './supabaseClient'

function App() {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Logout error:', error.message)
    } else {
      console.log('User logged out')
      window.location.reload() // optional simple redirect
    }
  }

  return (
    <div className='m-10'>
      <h1 className='text-3xl'>Notes App</h1>
      <button
        onClick={handleLogout}
        className='text-red-500 hover:undeline pb-4'
      >
        Logout
      </button>

      <SignUp />
      <LoginForm />
      <Notes />
    </div>
  )
}

export default App
