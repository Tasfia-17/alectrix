import React from 'react';
import { AvatarData } from '../../App';

interface RoastingAvatarProps {
    avatar: AvatarData;
    text: string;
}

const RoastingAvatar: React.FC<RoastingAvatarProps> = ({ avatar, text }) => {
    return (
        <div className="w-full flex items-start gap-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 animate-bob" style={{ imageRendering: 'pixelated' }}>
                <avatar.component />
            </div>
            <div className="relative bg-pixel-purple-mid text-pixel-purple-light border-2 border-pixel-black p-3 text-sm mt-4 max-w-xs animate-fade-in" style={{ boxShadow: '3px 3px 0px #000' }}>
                <p>{text}</p>
                <div className="absolute left-4 -bottom-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-pixel-black"></div>
                <div className="absolute left-[17px] -bottom-[6px] w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[7px] border-t-pixel-purple-mid"></div>
            </div>
        </div>
    );
}

export default RoastingAvatar;
