
import React from 'react';
import { DiceType } from '../types';

interface DiceIconProps {
  type: DiceType;
  value?: number | string;
  className?: string;
}

const DiceIcon: React.FC<DiceIconProps> = ({ type, value, className = "" }) => {
  const baseStyles = "relative flex items-center justify-center font-bold text-white shadow-lg transition-all duration-300";
  
  const renderShape = () => {
    switch (type) {
      case 'd4':
        return (
          <div className={`${baseStyles} w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-700 [clip-path:polygon(50%_0%,0%_100%,100%_100%)] ${className}`}>
            <span className="mt-4 text-xl">{value}</span>
          </div>
        );
      case 'd6':
        return (
          <div className={`${baseStyles} w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-700 rounded-lg ${className}`}>
            <span className="text-2xl">{value}</span>
          </div>
        );
      case 'd8':
        return (
          <div className={`${baseStyles} w-16 h-20 bg-gradient-to-br from-emerald-500 to-teal-700 [clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)] ${className}`}>
            <span className="text-2xl">{value}</span>
          </div>
        );
      case 'd10':
        return (
          <div className={`${baseStyles} w-16 h-18 bg-gradient-to-br from-cyan-500 to-blue-700 [clip-path:polygon(50%_0%,100%_40%,80%_100%,20%_100%,0%_40%)] ${className}`}>
            <span className="text-xl">{value}</span>
          </div>
        );
      case 'd12':
        return (
          <div className={`${baseStyles} w-18 h-18 bg-gradient-to-br from-indigo-500 to-violet-700 [clip-path:polygon(30%_0%,70%_0%,100%_30%,100%_70%,70%_100%,30%_100%,0%_70%,0%_30%)] ${className}`}>
            <span className="text-xl">{value}</span>
          </div>
        );
      case 'd20':
        return (
          <div className={`${baseStyles} w-20 h-20 bg-gradient-to-br from-purple-500 to-fuchsia-700 [clip-path:polygon(50%_0%,95%_25%,95%_75%,50%_100%,5%_75%,5%_25%)] ${className}`}>
            <span className="text-2xl">{value}</span>
          </div>
        );
      case 'coin':
        return (
          <div className={`${baseStyles} w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 border-4 border-amber-300 ring-2 ring-amber-600 ${className}`}>
            <span className="text-sm uppercase tracking-tighter text-amber-900 drop-shadow-sm font-black">{value}</span>
          </div>
        );
      default:
        return null;
    }
  };

  return renderShape();
};

export default DiceIcon;
