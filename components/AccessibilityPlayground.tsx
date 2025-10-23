
import React, { useState, useMemo } from 'react';
import type { PaletteScale } from '../types';
import { getContrastRatio } from '../services/colorService';
import { WCAG_LEVELS, CheckCircleIcon, XCircleIcon } from '../constants';

interface AccessibilityPlaygroundProps {
  palette: PaletteScale;
}

const AccessibilityPlayground: React.FC<AccessibilityPlaygroundProps> = ({ palette }) => {
  const [bgColorName, setBgColorName] = useState('900');
  const [fgColorName, setFgColorName] = useState('100');

  const { contrast, bgColor, fgColor } = useMemo(() => {
    const bg = palette[bgColorName];
    const fg = palette[fgColorName];
    if (!bg || !fg) return { contrast: 1, bgColor: {hex: '#000'}, fgColor: {hex: '#FFF'} };
    return {
      contrast: getContrastRatio(bg.rgb, fg.rgb),
      bgColor: bg,
      fgColor: fg,
    };
  }, [palette, bgColorName, fgColorName]);

  const checks = useMemo(() => ({
    aaNormal: contrast >= WCAG_LEVELS.AA_NORMAL,
    aaLarge: contrast >= WCAG_LEVELS.AA_LARGE,
    aaaNormal: contrast >= WCAG_LEVELS.AAA_NORMAL,
    aaaLarge: contrast >= WCAG_LEVELS.AAA_LARGE,
  }), [contrast]);

  const renderCheck = (pass: boolean) => (
    pass
      ? <CheckCircleIcon className="w-6 h-6 text-green-400" />
      : <XCircleIcon className="w-6 h-6 text-red-400" />
  );

  return (
    <section className="bg-slate-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Accessibility Playground</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="bg-color" className="block text-sm font-medium text-slate-300 mb-1">Background</label>
          <select id="bg-color" value={bgColorName} onChange={(e) => setBgColorName(e.target.value)} className="w-full bg-slate-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {Object.keys(palette).map(name => <option key={`bg-${name}`} value={name}>{name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="fg-color" className="block text-sm font-medium text-slate-300 mb-1">Text Color</label>
          <select id="fg-color" value={fgColorName} onChange={(e) => setFgColorName(e.target.value)} className="w-full bg-slate-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {Object.keys(palette).map(name => <option key={`fg-${name}`} value={name}>{name}</option>)}
          </select>
        </div>
      </div>
      
      <div style={{ backgroundColor: bgColor.hex, color: fgColor.hex }} className="p-6 rounded-lg transition-colors duration-300">
        <p className="text-3xl font-bold">Large Text (18pt+)</p>
        <p className="mt-2">Normal Text (16pt)</p>
        <p className="mt-4 text-sm">The quick brown fox jumps over the lazy dog.</p>
      </div>

      <div className="mt-6 text-center">
        <p className="text-lg text-slate-300">Contrast Ratio</p>
        <p className="text-5xl font-extrabold text-white">{contrast.toFixed(2)}:1</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div className="bg-slate-700 p-4 rounded-lg flex justify-between items-center">
          <div className="text-slate-300">
            <p className="font-bold text-white">AA Normal</p>
            <p>Ratio ≥ {WCAG_LEVELS.AA_NORMAL}</p>
          </div>
          {renderCheck(checks.aaNormal)}
        </div>
        <div className="bg-slate-700 p-4 rounded-lg flex justify-between items-center">
          <div className="text-slate-300">
            <p className="font-bold text-white">AA Large</p>
            <p>Ratio ≥ {WCAG_LEVELS.AA_LARGE}</p>
          </div>
          {renderCheck(checks.aaLarge)}
        </div>
        <div className="bg-slate-700 p-4 rounded-lg flex justify-between items-center">
          <div className="text-slate-300">
            <p className="font-bold text-white">AAA Normal</p>
            <p>Ratio ≥ {WCAG_LEVELS.AAA_NORMAL}</p>
          </div>
          {renderCheck(checks.aaaNormal)}
        </div>
        <div className="bg-slate-700 p-4 rounded-lg flex justify-between items-center">
          <div className="text-slate-300">
            <p className="font-bold text-white">AAA Large</p>
            <p>Ratio ≥ {WCAG_LEVELS.AAA_LARGE}</p>
          </div>
          {renderCheck(checks.aaaLarge)}
        </div>
      </div>
    </section>
  );
};

export default AccessibilityPlayground;
