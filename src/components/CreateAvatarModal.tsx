import React, { useState } from 'react';
import Modal from './ui/Modal';
import Button from './ui/Button';

interface CreateAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateAvatarModal: React.FC<CreateAvatarModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would handle the form submission here
    // For this demo, we just close the modal
    onClose();
  };

  const avatarStyles = [
    { id: 'abstract', label: 'Abstract', color: 'bg-[var(--accent)]', letter: 'A' },
    { id: 'human', label: 'Human', color: 'bg-[var(--primary)]', letter: 'H' },
    { id: 'pixel', label: 'Pixel', color: 'bg-[var(--primary-hover)]', letter: 'P' },
    { id: 'anime', label: 'Anime', color: 'bg-pink-500', letter: 'A' },
    { id: 'robot', label: 'Robot', color: 'bg-cyan-500', letter: 'R' },
    { id: 'fantasy', label: 'Fantasy', color: 'bg-purple-700', letter: 'F' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Avatar">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-[var(--secondary)] rounded-full mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-[var(--primary)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Create your perfect AI-generated avatar</p>
        </div>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-[var(--card-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all bg-white dark:bg-gray-800 dark:text-white"
            placeholder="Enter name"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-[var(--card-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all bg-white dark:bg-gray-800 dark:text-white"
            placeholder="Enter email"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Avatar Style
          </label>
          <div className="grid grid-cols-3 gap-2">
            {avatarStyles.map((style) => (
              <div 
                key={style.id}
                className={`border border-[var(--card-border)] rounded-md p-2 hover:bg-[var(--secondary)] cursor-pointer transition-all ${selectedStyle === style.id ? 'ring-2 ring-[var(--primary)] shadow-md' : ''}`}
                onClick={() => setSelectedStyle(style.id)}
              >
                <div className={`aspect-square rounded-md ${style.color} flex items-center justify-center text-white`}>
                  {style.letter}
                </div>
                <p className="text-xs text-center mt-1">{style.label}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-2">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            By creating an avatar, you agree to our <a href="#" className="text-[var(--primary)] hover:underline">Terms of Service</a> and <a href="#" className="text-[var(--primary)] hover:underline">Privacy Policy</a>.
          </p>
          
          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose} className="px-4">
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] hover:opacity-90 text-white px-4">
              Create Avatar
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreateAvatarModal; 