'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Avatar from '@/components/Avatar';
import Button from '@/components/ui/Button';
import CreateAvatarModal from '@/components/CreateAvatarModal';
import TypeWriter from '@/components/ui/TypeWriter';
import { getUsers, User } from '@/lib/api';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  // Simulate user information
  const userName = 'Ayushman';
  const timeOfDay = getTimeOfDay();

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const data = await getUsers();
        
        // Ensure data is an array before setting it to state
        setUsers(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error('Error in fetchUsers:', err);
        setError('Failed to load avatars. Please try again later.');
        setUsers([]); // Reset users to empty array on error
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  function getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  }

  const handleEditAvatar = (id: number) => {
    setSelectedUser(id);
    setIsModalOpen(true);
  };

  const handleCreateAvatar = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Render fallback UI if users is undefined or not an array
  const renderAvatars = () => {
    if (!Array.isArray(users)) {
      return (
        <div className="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-6 rounded-xl shadow-lg">
          <p className="font-medium">Error: Failed to load avatar data.</p>
        </div>
      );
    }

    if (users.length === 0) {
      return (
        <div className="bg-yellow-50 dark:bg-yellow-900/10 text-yellow-800 dark:text-yellow-300 p-8 rounded-xl shadow-md flex flex-col items-center text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-4 text-yellow-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="font-medium text-lg mb-2">No avatars found</p>
          <p className="text-sm mb-4">Create your first AI avatar to get started!</p>
          <Button onClick={handleCreateAvatar} size="sm">
            Create New Avatar
          </Button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user, index) => (
          <div key={user.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <Avatar
              id={user.id}
              name={`${user.first_name} ${user.last_name}`}
              email={user.email}
              avatar={user.avatar}
              onEdit={handleEditAvatar}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-indigo-950/30 dark:to-purple-950/40 overflow-hidden relative animate-gradient">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-pink-200/20 to-indigo-200/20 blur-3xl dark:from-pink-800/10 dark:to-indigo-800/10 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-indigo-200/30 to-purple-200/30 blur-3xl dark:from-indigo-800/10 dark:to-purple-800/10 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 left-20 w-40 h-40 rounded-full bg-gradient-to-tr from-blue-200/10 to-cyan-200/10 blur-2xl dark:from-blue-800/5 dark:to-cyan-800/5 animate-float" style={{ animationDelay: '3s' }}></div>
      </div>
      
      {/* Header section - Seamless with background */}
      <header className="relative pt-6 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
                AI Avatar Dashboard
              </h1>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                <TypeWriter 
                  text={`Good ${timeOfDay}, ${userName}! ✨`}
                  speed={70}
                  className="font-bold"
                />
              </p>
            </div>
            <div>
              <Button 
                onClick={handleCreateAvatar} 
                variant="secondary"
                className="bg-white hover:bg-gray-50 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:translate-y-[-2px] group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-black group-hover:text-[var(--primary)] transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span className="text-black font-bold group-hover:text-[var(--primary)] transition-colors duration-300">Create New Avatar</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-6 pt-2 pb-8 relative z-10">
        {/* Subtle gradient line to visually connect with header */}
        <div className="w-full max-w-6xl mx-auto h-0.5 bg-gradient-to-r from-transparent via-[var(--primary)]/20 to-transparent mb-8"></div>
        
        <section className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent hover:scale-105 transform transition-all duration-300 cursor-default">Your Avatars</h2>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center hover:bg-gray-100 dark:hover:bg-gray-800/50 px-3 py-1 rounded-full transition-all duration-300 cursor-default group">
              <span className="group-hover:text-[var(--primary)] transition-colors">AI-powered</span>
              <div className="ml-2 w-2 h-2 rounded-full bg-green-400 animate-pulse group-hover:w-3 group-hover:h-3 transition-all"></div>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-14 w-14 border-t-3 border-b-3 border-[var(--primary)]"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-6 rounded-xl shadow-lg">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-3 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="font-medium">{error}</p>
              </div>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 text-sm text-[var(--primary)] hover:underline focus:outline-none"
              >
                Try again
              </button>
            </div>
          ) : (
            renderAvatars()
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-gray-200/20 dark:border-gray-800/20 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm text-gray-600 dark:text-gray-400 hover:text-[var(--primary)] transition-colors cursor-default group">
                &copy; {2025} 
                <span className="mx-1 group-hover:text-[var(--accent)] transition-colors">AI Avatar Dashboard</span> 
                • Created for Frontend Internship
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[var(--primary)] transition-all duration-300 hover:scale-125 transform">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-all duration-300 hover:scale-125 transform">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.21c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.755zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Subtle decorative element at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--primary)]/20 to-transparent"></div>
      </footer>

      {/* Floating create button with tooltip */}
      <div className="fixed right-6 bottom-6 z-10 group animate-gentle-float">
        <div className="absolute bottom-16 right-0 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 bg-black/80 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-lg pointer-events-none whitespace-nowrap shadow-xl">
          Create New Avatar
          <div className="absolute -bottom-1 right-4 w-2 h-2 bg-black/80 transform rotate-45"></div>
        </div>
        
        {/* Button with rotating gradient border */}
        <div className="relative rounded-full animate-slow-spin-reverse p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <Button
            onClick={handleCreateAvatar}
            className="rounded-full w-14 h-14 shadow-lg backdrop-blur-sm flex items-center justify-center bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] hover:from-[var(--accent)] hover:to-[var(--primary)] transition-all duration-1000 hover:shadow-xl hover:scale-105 border border-white/10 group"
            aria-label="Create New Avatar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white group-hover:animate-slow-spin transition-all duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Create/Edit Avatar Modal */}
      <CreateAvatarModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
