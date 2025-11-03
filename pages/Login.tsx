import React, { useState } from 'react';
import { LoginContent, Page } from '../types';
import { useAuth } from '../context/AuthContext';
import Section from '../components/Section';

interface LoginProps {
  content: LoginContent;
  onNavigate: (page: Page) => void;
}

const Login: React.FC<LoginProps> = ({ content, onNavigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAdmin } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      onNavigate('admin');
    } else {
      setError(content.form.error);
    }
  };

  return (
    <>
      <div className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">{content.title}</h1>
        </div>
      </div>
      <Section>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          {isAdmin ? (
            <p className="text-center text-lg text-green-600">{content.loggedInMessage}</p>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <p className="mb-4 text-center text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
              <div className="mb-6">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">{content.form.username}</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-white"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">{content.form.password}</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-orange-600 transition-all duration-300 text-lg transform hover:scale-105 hover:shadow-lg active:scale-95"
              >
                {content.form.submit}
              </button>
            </form>
          )}
        </div>
      </Section>
    </>
  );
};

export default Login;
