import { useState } from 'react'
import { supabase } from '../supabaseClient'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  //RESET PASSWORD
  const [resetEmail, setResetEmail] = useState('')
  const [resetMessage, setResetMessage] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage('Login successful!')
    }
  }

  //RESET PASSWORD
  const resetPassword = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail)

    if(error) {
      setResetMessage(`Error: ${error.message}`)
    } else {
      setResetMessage('Password reset email sent')
    }
  }

  //LOGIN WITH MAGIC LINK
  const loginWithMagicLink = async (email) => {
    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      console.error('Error:', error.message)
    } else {
      console.log('Magic link sent to email')
    }
  }

  return (
    <div>
    <form onSubmit={handleLogin} className="flex flex-col gap-3 max-w-sm">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Login
      </button>

      <p className="text-sm text-gray-600">{message}</p>
    </form>

    <div>
      <h3>Forgot password?</h3>

      <input 
      type="email"
      placeholder='Enter email'
      value={resetEmail}
      onChange={(e) => setResetEmail(e.target.value)}
      className='border p-2 rounded w-full mb-2' 
      />

      <button
      onClick={resetPassword}
      className='bg-yellow-500 text-white px-3 py-1 rounded'
      >
        Send reset link
      </button>

      <p className='text-sm mt-2'>{resetMessage}</p>
    </div>

    <button
      onClick={() => loginWithMagicLink(email)}
      className='bg-purple-500 text-white p-2 rounded hover:bg-purple-600 mt-2'
    >
      Send Magic Link
    </button>
    </div>

  )
}

export default Login;
