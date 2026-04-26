import React from 'react'
import { supabase } from './supabaseClient'
import Notes from './components/Notes'
import SignUp from './auth/SignUp'
import Login from './auth/Login'
import ResetPassword from './auth/ResetPassword'

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
      <Login />
      <ResetPassword />
      <Notes />
    </div>
  )
}

export default App
