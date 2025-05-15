'use client';

import React, { useState, useEffect } from 'react';

interface TypeWriterProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  delay?: number;
}

const TypeWriter: React.FC<TypeWriterProps> = ({
  text,
  speed = 50,
  className = '',
  onComplete,
  delay = 0
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
    setCurrentIndex(0);
    
    // Add delay before starting
    const delayTimer = setTimeout(() => {
      setIsStarted(true);
    }, delay);
    
    return () => clearTimeout(delayTimer);
  }, [text, delay]);

  useEffect(() => {
    if (!isStarted) return;
    
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete, isStarted]);

  return (
    <span className={className}>
      {displayedText}
      <span className="inline-block w-0.5 h-5 bg-current ml-0.5 animate-blink align-middle">
        &nbsp;
      </span>
    </span>
  );
};

export default TypeWriter; 