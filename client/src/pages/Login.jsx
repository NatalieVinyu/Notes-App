// LOGIN.JSX
import { useState } from 'react';
import api from '../services/api'

function Login({ onLoginSuccess, goToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/login", {
        email,
        password
      });

      setMessage("Login successful");
      onLoginSuccess();
      window.location.href = "/notes";

    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

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
        disabled={loading}
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="text-sm text-gray-600">{message}</p>

      <button
        type="button"
        onClick={goToSignup}
        className='text-blue-500 underline'
      >
        Don't have an account? Sign up
      </button>
    </form>
    </div>

  )
}

export default Login;
