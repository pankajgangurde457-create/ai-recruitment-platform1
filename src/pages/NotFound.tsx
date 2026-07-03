import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-[#07080a] text-[#e2e2e9] flex flex-col items-center justify-center font-body-base px-6">
      <div className="absolute top-[20%] left-[20%] w-[30%] h-[30%] bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="text-center relative z-10 max-w-md">
        <h1 className="text-9xl font-extrabold text-white tracking-widest animate-pulse">404</h1>
        
        <div className="bg-primary/20 px-3 py-1.5 text-xs text-primary rounded-md font-mono-technical uppercase tracking-widest inline-block mb-6 -mt-2">
          Page Not Found
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">Lost in the pipeline?</h2>
        <p className="text-sm text-on-surface-variant mb-8">
          The recruitment page or talent asset you are looking for doesn't exist or has been shifted. Let's redirect you.
        </p>

        <button 
          onClick={() => navigate('/')} 
          className="px-6 py-3 bg-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] cursor-pointer"
        >
          Back to Safety
        </button>
      </div>
    </div>
  );
};
export default NotFound;
