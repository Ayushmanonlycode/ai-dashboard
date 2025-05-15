import React from 'react';
import Image from 'next/image';
import Card, { CardContent, CardFooter } from './ui/Card';
import Button from './ui/Button';

export interface AvatarProps {
  id: number;
  name: string;
  email: string;
  avatar: string;
  onEdit: (id: number) => void;
}

const Avatar: React.FC<AvatarProps> = ({ id, name, email, avatar, onEdit }) => {
  // Use a fallback image if avatar is undefined
  const avatarUrl = avatar || 'https://via.placeholder.com/128';
  
  // Make sure name and email are strings
  const displayName = typeof name === 'string' ? name : 'Unknown User';
  const displayEmail = typeof email === 'string' ? email : 'No email provided';
  
  return (
    <Card hoverable className="h-full flex flex-col transform transition-all duration-300 hover:shadow-[var(--box-shadow-hover)] animate-fade-in">
      <div className="relative pt-6 pb-2 px-4 flex justify-center">
        <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-[var(--primary)] transition-all duration-300 hover:scale-105 shadow-lg">
          <Image
            src={avatarUrl}
            alt={`${displayName}'s avatar`}
            fill
            sizes="128px"
            style={{ objectFit: 'cover' }}
            priority
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/128';
            }}
            className="transition-all duration-300"
          />
        </div>
        <div className="absolute top-2 right-2 bg-[var(--accent)] text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
          AI
        </div>
      </div>
      <CardContent className="flex-grow text-center space-y-2">
        <h3 className="text-xl font-bold transition-colors">{displayName}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{displayEmail}</p>
        
        <div className="mt-2 flex justify-center space-x-1">
          {[1, 2, 3].map((star) => (
            <svg 
              key={star}
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 text-yellow-400" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" 
              />
            </svg>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pb-5">
        <Button 
          onClick={() => onEdit(id)}
          variant="outline"
          className="w-full rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-[var(--primary)] hover:to-[var(--accent)] hover:text-white hover:border-transparent hover:shadow-lg group overflow-hidden relative"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 group-hover:text-white transition-colors relative z-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <span className="group-hover:text-white transition-colors relative z-10 font-medium">
            Edit Avatar
          </span>
          <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform translate-x-10 group-hover:translate-x-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Avatar; 