import { useState } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Calls the versioned registration endpoint
      await api.post('/auth/register', { email, password, role });
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      // Displays validation errors from Zod or server errors
      alert(err.response?.data?.message || 'Registration failed. Check your inputs.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleRegister} className="p-8 bg-white shadow-lg rounded-lg w-96 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create Account</h2>
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            required
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password (min 6 characters)" 
            required
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setPassword(e.target.value)} 
          />
          <select 
            className="w-full p-3 border rounded bg-white outline-none"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="USER">User Role</option>
            <option value="ADMIN">Admin Role</option>
          </select>
          <button type="submit" className="w-full bg-green-600 text-white p-3 rounded font-semibold hover:bg-green-700 transition">
            Register
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
          </p>
        </div>
      </form>
    </div>
  );
}