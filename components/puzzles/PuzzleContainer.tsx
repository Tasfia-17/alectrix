import React from 'react';

interface PuzzleContainerProps {
    title: string;
    children: React.ReactNode;
}

const PuzzleContainer: React.FC<PuzzleContainerProps> = ({ title, children }) => {
    return (
        <div className="w-full max-w-5xl mx-auto p-0.5 rounded-2xl bg-gradient-to-br from-aurora-purple/20 via-white/50 to-aurora-purple/20 shadow-2xl shadow-aurora-purple/10">
            <div className="bg-white/50 backdrop-blur-md rounded-[14px] p-4 sm:p-6">
                <h2 className="font-handwritten text-3xl sm:text-4xl text-center mb-4 text-aurora-dark-text/80">
                    {title}
                </h2>
                <div className="font-nunito text-aurora-dark-text/90">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PuzzleContainer;