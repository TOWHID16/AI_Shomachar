// Heading.jsx
import React from 'react';
import { cn } from '@/lib/utils';

// The 'icon' prop is the component itself (e.g., the Code icon from lucide-react)
// eslint-disable-next-line no-unused-vars
export const Heading = ({ title, description, icon: IconComponent, iconColor, bgColor }) => {
  return (
    <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
      <div className={cn("p-2 w-fit rounded-md", bgColor)}>
        {/* We render the passed icon component here */}
        <IconComponent className={cn("w-10 h-10", iconColor)} />
      </div>
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
