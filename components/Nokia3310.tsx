import React from 'react';
import PixelCanvas from './PixelCanvas';
import PhoneKeypad from './PhoneKeypad';
import { useSnakeGame } from '../hooks/useSnakeGame';
import { COLOR_SCREEN_BG } from '../constants';

const Nokia3310: React.FC = () => {
  const { gameState, handleInput } = useSnakeGame();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4">
      
      {/* Phone Body Shadow/Depth */}
      <div className="relative z-10 rounded-[3rem] bg-gray-900 p-2 shadow-2xl">
        
        {/* Main Casing - Dark Blue/Grey Classic */}
        <div className="
            relative
            w-[340px] h-[680px]
            bg-[#4A5D75]
            rounded-[2.5rem]
            border-[4px] border-[#364354]
            shadow-[inset_0_10px_30px_rgba(255,255,255,0.15),inset_0_-10px_30px_rgba(0,0,0,0.4)]
            flex flex-col items-center
            overflow-hidden
        ">
            {/* Top Curve Accent (The 3310 'forehead') */}
            <div className="absolute top-0 w-full h-28 bg-[#4A5D75] rounded-t-[2.5rem] flex flex-col items-center justify-start pt-8 z-0">
               {/* Earpiece */}
               <div className="w-20 h-3 bg-black/40 rounded-full mb-3 flex items-center justify-center gap-1.5 shadow-inner">
                 <div className="w-1.5 h-1.5 bg-black/60 rounded-full"></div>
                 <div className="w-1.5 h-1.5 bg-black/60 rounded-full"></div>
                 <div className="w-1.5 h-1.5 bg-black/60 rounded-full"></div>
                 <div className="w-1.5 h-1.5 bg-black/60 rounded-full"></div>
               </div>
               {/* Logo */}
               <div className="text-gray-200 font-sans font-bold tracking-[0.2em] text-sm drop-shadow-md opacity-90">NOKIA</div>
            </div>

            {/* Screen Area Container - Expanded */}
            <div className="
                relative z-10 mt-24 
                w-[260px] h-[190px] 
                bg-[#9CA6B0] 
                rounded-t-[1rem] rounded-b-[2.5rem] 
                p-3 
                flex items-center justify-center 
                border-[2px] border-[#7A8694] 
                shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_5px_15px_rgba(0,0,0,0.3)]
            ">
                 {/* Black border around the glass lens */}
                 <div className="w-full h-full bg-[#333] rounded-[0.8rem] p-[2px] shadow-sm">
                     
                     {/* The actual Glass/Plastic Lens */}
                     <div className="w-full h-full bg-[#5c6655] rounded-[0.7rem] p-[6px] flex items-center justify-center relative overflow-hidden shadow-inner">
                         
                         {/* The Screen Itself */}
                         <div className="w-full h-full relative overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]" style={{ backgroundColor: COLOR_SCREEN_BG }}>
                            <PixelCanvas gameState={gameState} />
                            
                            {/* Subtle Backlight Glow */}
                            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(200,255,150,0.4)] mix-blend-overlay"></div>
                            
                            {/* Faint Grid/Scanlines - Reduced opacity for better visibility */}
                            <div className="absolute inset-0 pointer-events-none opacity-5"
                                 style={{
                                   backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 50%, transparent 50%), linear-gradient(90deg, rgba(0,0,0,0.1) 50%, transparent 50%)',
                                   backgroundSize: '2px 2px'
                                 }}
                            ></div>
                         </div>
                     </div>
                 </div>
            </div>

            {/* Controls */}
            <div className="relative z-10 w-full flex-1 mt-6">
                <PhoneKeypad onPress={handleInput} />
            </div>

            {/* Side grip visual accents */}
            <div className="absolute top-[35%] left-0 w-1.5 h-32 bg-gray-800/20 rounded-r-md border-r border-white/10"></div>
            <div className="absolute top-[35%] right-0 w-1.5 h-32 bg-gray-800/20 rounded-l-md border-l border-white/10"></div>

        </div>
      </div>

      <div className="mt-8 text-gray-600 text-sm font-sans flex flex-col items-center font-medium">
        <p>Use Keypad or Arrow Keys</p>
        <p className="text-xs opacity-70 mt-1">2/8/4/6 or WASD also work</p>
      </div>
    </div>
  );
};

export default Nokia3310;