import React from 'react';
import { Sidebar } from './Sidebar';
import { AnimatedShapes } from './AnimatedShapes';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-secondary text-primary dark:bg-dark dark:text-secondary">
      <AnimatedShapes />
      <Sidebar />
      <main className="flex-1 w-full overflow-y-auto">
        <div className="pt-16 lg:pt-0 px-4 lg:px-8 py-6">
          {children}
        </div>
      </main>
    </div>
  );
};
