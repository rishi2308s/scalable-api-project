import { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchTasks = async () => {
    try {
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch (err) {
      if (err.response?.status === 403) navigate('/login');
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTitle) return;
    await api.post('/tasks', { title: newTitle });
    setNewTitle('');
    fetchTasks();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };
  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || "Only admins can delete tasks");
    }
  };
  useEffect(() => { fetchTasks(); }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welcome, {user?.email}</h1>
        <button onClick={handleLogout} className="text-red-600 font-medium">Logout</button>
      </div>
    <div key={task.id} className="p-4 bg-white shadow rounded flex justify-between items-center">
     <span>{task.title}</span>
      <div className="flex gap-4 items-center">
        <span className="text-xs text-gray-400 capitalize">{task.userId === user?.id ? 'Own' : 'Admin View'}</span>
        <button 
          onClick={() => handleDelete(task.id)} 
          className="text-red-500 text-sm hover:underline"
        >
        Delete
        </button>
      </div>
    </div>
      <form onSubmit={handleCreateTask} className="flex gap-2 mb-6">
        <input 
          className="flex-1 p-2 border rounded"
          placeholder="New Task Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Task</button>
      </form>

      <div className="space-y-3">
        {tasks.map(task => (
          <div key={task.id} className="p-4 bg-white shadow rounded flex justify-between">
            <span>{task.title}</span>
            <span className="text-xs text-gray-400 capitalize">{task.userId === user?.id ? 'Own' : 'Admin View'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}