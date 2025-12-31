import React from 'react';
import { KeyPadButton } from '../types';

interface PhoneKeypadProps {
  onPress: (key: KeyPadButton) => void;
}

const PhoneKeypad: React.FC<PhoneKeypadProps> = ({ onPress }) => {
  
  const Button = ({ 
    label, 
    value, 
    subLabel, 
    className, 
    style 
  }: { 
    label?: React.ReactNode, 
    value: KeyPadButton, 
    subLabel?: string, 
    className?: string, 
    style?: React.CSSProperties
  }) => (
    <button
      onClick={(e) => {
        e.preventDefault();
        onPress(value);
      }}
      className={`
        relative active:translate-y-[1px] select-none touch-manipulation
        transition-all duration-75 ease-in-out
        ${className}
      `}
      style={style}
    >
        {label && <span className="z-10 relative">{label}</span>}
        {subLabel && <span className="absolute bottom-1 text-[8px] text-gray-400 opacity-70 z-10 font-sans">{subLabel}</span>}
    </button>
  );

  return (
    <div className="flex flex-col items-center w-full px-8 pb-12 pt-4 gap-4">
      
      {/* Navigation Cluster */}
      <div className="flex w-full justify-between items-center px-2 mb-2">
         {/* C Button */}
         <Button 
            value="C"
            label="C"
            className="w-12 h-8 rounded-l-full rounded-r-lg bg-gray-100 border-b-4 border-gray-300 shadow-md text-gray-800 font-bold text-lg flex items-center justify-center transform -rotate-12 mt-4 active:border-b-0 active:mt-5"
         />

         {/* Menu Button (Navi Key) */}
         <div className="relative">
             <div className="absolute inset-0 bg-blue-900 rounded-[40%] transform rotate-0 blur-sm opacity-20 translate-y-2"></div>
             <Button 
                value="MENU"
                className="w-20 h-10 bg-gradient-to-b from-blue-700 to-blue-800 border-b-4 border-blue-900 rounded-[10px] shadow-lg flex items-center justify-center active:border-b-0 active:translate-y-1"
                style={{ clipPath: 'polygon(0% 20%, 10% 0%, 90% 0%, 100% 20%, 100% 80%, 90% 100%, 10% 100%, 0% 80%)' }}
                label={<div className="w-12 h-1 bg-white opacity-40 rounded-full"></div>}
             />
         </div>

         {/* Up/Down Arrows */}
         <div className="flex flex-col gap-2 transform rotate-6 mt-2">
            <Button 
                value="UP"
                label="▲"
                className="w-10 h-8 bg-gray-100 border-b-4 border-gray-300 rounded-t-lg rounded-b-md shadow-md text-gray-800 text-xs flex items-center justify-center active:border-b-0"
            />
             <Button 
                value="DOWN"
                label="▼"
                className="w-10 h-8 bg-gray-100 border-b-4 border-gray-300 rounded-b-lg rounded-t-md shadow-md text-gray-800 text-xs flex items-center justify-center active:border-b-0"
            />
         </div>
      </div>

      {/* Number Pad */}
      <div className="grid grid-cols-3 gap-x-6 gap-y-4 w-full">
         <NumBtn onPress={onPress} val="1" sub="" />
         <NumBtn onPress={onPress} val="2" sub="abc" />
         <NumBtn onPress={onPress} val="3" sub="def" />
         <NumBtn onPress={onPress} val="4" sub="ghi" />
         <NumBtn onPress={onPress} val="5" sub="jkl" />
         <NumBtn onPress={onPress} val="6" sub="mno" />
         <NumBtn onPress={onPress} val="7" sub="pqrs" />
         <NumBtn onPress={onPress} val="8" sub="tuv" />
         <NumBtn onPress={onPress} val="9" sub="wxyz" />
         <NumBtn onPress={onPress} val="*" sub="+" />
         <NumBtn onPress={onPress} val="0" sub="⎵" />
         <NumBtn onPress={onPress} val="#" sub="⇧" />
      </div>
    </div>
  );
};

// Helper for number buttons to keep code DRY and styled similarly
const NumBtn = ({ onPress, val, sub }: { onPress: (v: KeyPadButton) => void, val: KeyPadButton, sub: string }) => (
    <button
      onClick={() => onPress(val)}
      className="
        relative group flex flex-col items-center justify-center
        w-full h-10
        bg-gray-100/90
        border-b-4 border-gray-300
        active:border-b-0 active:translate-y-1
        rounded-2xl
        shadow-sm
        overflow-hidden
      "
      style={{
         // Unique shape for 3310 keys (slightly oval/merged)
         borderRadius: '40% 40% 45% 45%'
      }}
    >
        <span className="text-lg font-bold text-gray-800 leading-none z-10 mt-1 font-sans">{val}</span>
        <span className="text-[9px] text-gray-500 font-sans leading-none z-10 mb-1">{sub}</span>
        
        {/* Shine effect */}
        <div className="absolute top-1 left-2 w-4 h-2 bg-white opacity-40 rounded-full blur-[1px]"></div>
    </button>
);

export default PhoneKeypad;