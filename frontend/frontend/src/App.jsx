import React, { useEffect, useState } from 'react';
import api from './services/api';

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', zip: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      setError('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (editingId) {
        await api.put(`/users/${editingId}`, form);
      } else {
        await api.post('/users', form);
      }
      setForm({ name: '', zip: '' });
      setEditingId(null);
      await fetchUsers();
    } catch (err) {
      setError('❌ Failed to save user. Make sure zip is valid.');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  const editUser = (user) => {
    setForm({ name: user.name, zip: user.zip });
    setEditingId(user.id);
  };

  return (
    <div className="bg-white min-h-screen p-6 max-w-5xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Users Data</h1>

      <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded border space-y-4 shadow">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          name="zip"
          placeholder="Zip Code"
          value={form.zip}
          onChange={handleChange}
          required
          className="p-2 border rounded w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
        >
          {loading ? (editingId ? 'Updating...' : 'Creating...') : (editingId ? 'Update User' : 'Create User')}
        </button>
      </form>

      {error && <div className="text-red-600 mb-4 text-center">{error}</div>}

      {users.length === 0 ? (
        <p className="text-gray-500 text-center">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 shadow rounded bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Zip</th>
                <th className="p-3 border-b">Latitude</th>
                <th className="p-3 border-b">Longitude</th>
                <th className="p-3 border-b">Timezone</th>
                <th className="p-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 border-b">{user.name}</td>
                  <td className="p-3 border-b">{user.zip}</td>
                  <td className="p-3 border-b">{user.latitude}</td>
                  <td className="p-3 border-b">{user.longitude}</td>
                  <td className="p-3 border-b">{user.timezone}</td>
                  <td className="p-3 border-b text-center space-x-2">
                    <button
                      onClick={() => editUser(user)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;