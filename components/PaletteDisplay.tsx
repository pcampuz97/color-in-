
import React, { useState } from 'react';
import type { PaletteScale } from '../types';
import { getLuminance } from '../services/colorService';
import { CopyIcon } from '../constants';

interface PaletteDisplayProps {
  palette: PaletteScale;
}

const PaletteDisplay: React.FC<PaletteDisplayProps> = ({ palette }) => {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedValue(value);
    setTimeout(() => setCopiedValue(null), 2000);
  };

  return (
    <section className="bg-slate-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Color Palette</h2>
      <div className="space-y-2">
        {/* FIX: Use `Object.keys` to map over the palette. This provides better type
            inference than `Object.entries`, which was causing `colorData` to be of type `unknown`. */}
        {Object.keys(palette).map((name) => {
          const colorData = palette[name];
          const textColor = getLuminance(colorData.rgb) > 0.5 ? 'text-black' : 'text-white';
          const rgbString = `rgb(${colorData.rgb.r}, ${colorData.rgb.g}, ${colorData.rgb.b})`;
          
          return (
            <div key={name} style={{ backgroundColor: colorData.hex }} className="p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center transition-transform transform hover:scale-[1.02]">
              <div className={`font-bold text-lg ${textColor}`}>
                {name}
              </div>
              <div className="flex items-center gap-4 mt-2 sm:mt-0">
                <div className={`font-mono text-sm ${textColor} flex items-center`}>
                  {colorData.hex}
                  <button onClick={() => handleCopy(colorData.hex)} className={`ml-2 p-1 rounded-md hover:bg-white/20 ${textColor}`}>
                    {copiedValue === colorData.hex ? 'Copied!' : <CopyIcon className="w-4 h-4" />}
                  </button>
                </div>
                <div className={`font-mono text-sm ${textColor} flex items-center`}>
                  {rgbString}
                  <button onClick={() => handleCopy(rgbString)} className={`ml-2 p-1 rounded-md hover:bg-white/20 ${textColor}`}>
                     {copiedValue === rgbString ? 'Copied!' : <CopyIcon className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PaletteDisplay;