import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const DashboardCard = ({ 
  title, 
  description, 
  icon, 
  to, 
  className,
  completed = false,
  onClick
}) => {
  const content = (
    <div
      className={cn(
        "flex flex-col items-center p-6 bg-event-white rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]",
        "border-2 border-transparent hover:border-event-yellow",
        className
      )}
    >
      <div className="mb-4 p-3 bg-event-light-yellow rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>

      {completed && (
        <div className="mt-4 text-green-600 text-sm font-medium flex items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mr-1"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          Completed
        </div>
      )}
    </div>
  );

  if (onClick) {
    return (
      <div onClick={onClick} className="cursor-pointer">
        {content}
      </div>
    );
  }

  return <Link href={to}>{content}</Link>;
};

export default DashboardCard;
