import React, { useEffect, useState } from 'react';

interface ErrorBoxProps {
  messages: string[];
}

const ErrorBox: React.FC<ErrorBoxProps> = ({ messages }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (messages.length > 0) {
      queueMicrotask(() => setIsVisible(true));

      const timer = setTimeout(() => setIsVisible(false), 4800);
      return () => clearTimeout(timer);
    } else {
      queueMicrotask(() => setIsVisible(false));
    }
  }, [messages]);

  if (messages.length === 0) return null;

  return (
    <div className={`w-full transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
      {messages.map((msg, i) => (
        <div key={i} className="w-full py-2 bg-red-500 text-white rounded-md text-sm text-center shadow-md">
          {msg}
        </div>
      ))}
    </div>
  );
};

export default ErrorBox;
