import React from 'react';

interface DemoCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const DemoCard: React.FC<DemoCardProps> = ({ title, description, children }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200/80 p-5 flex flex-col transition-transform transform hover:shadow-lg hover:-translate-y-1">
      <div className="w-full aspect-video mb-4 bg-blue-50 rounded-lg overflow-hidden relative border border-slate-200">
        {children}
      </div>
      <h3 className="text-base font-bold text-slate-700 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm flex-grow">{description}</p>
    </div>
  );
};

export default DemoCard;