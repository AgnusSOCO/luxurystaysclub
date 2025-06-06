import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import Button from '../ui/Button';

const AdminAccess: React.FC = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const { verifyAccess } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      const isValid = verifyAccess(token.trim());
      if (isValid) {
        navigate('/admin');
      } else {
        setError('Invalid access token');
      }
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Admin Access</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">
              Access Token
            </label>
            <input
              type="password"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Enter your access token"
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>
          <Button type="submit" variant="primary" className="w-full">
            Access Admin Panel
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminAccess;