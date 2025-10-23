
import React, { useMemo } from 'react';
import type { PaletteEntry } from '../types';
import { getContrastRatio } from '../services/colorService';
import { WCAG_LEVELS } from '../constants';

interface AccessibilityGridProps {
  paletteArray: PaletteEntry[];
}

const AccessibilityGrid: React.FC<AccessibilityGridProps> = ({ paletteArray }) => {
  const contrastGrid = useMemo(() => {
    return paletteArray.map(rowColor =>
      paletteArray.map(colColor => {
        if (rowColor.name === colColor.name) return null;
        return getContrastRatio(rowColor.rgb, colColor.rgb);
      })
    );
  }, [paletteArray]);

  const getContrastColor = (ratio: number | null) => {
    if (ratio === null) return 'bg-slate-700';
    if (ratio >= WCAG_LEVELS.AAA_NORMAL) return 'bg-green-600';
    if (ratio >= WCAG_LEVELS.AA_NORMAL) return 'bg-yellow-600';
    return 'bg-red-600';
  };
  
  return (
    <section className="bg-slate-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Contrast Grid</h2>
      <p className="text-slate-400 mb-6 text-sm">Shows contrast ratio of text color (top row) on a background color (left column).</p>
      <div className="overflow-x-auto">
        <table className="border-collapse w-full min-w-[600px] text-xs text-center">
          <thead>
            <tr>
              <th className="p-1 w-12 h-12 border border-slate-700"></th>
              {paletteArray.map(color => (
                <th key={`head-${color.name}`} className="p-1 w-12 h-12 border border-slate-700">
                  <div className="w-full h-full rounded" style={{ backgroundColor: color.hex }}></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paletteArray.map((rowColor, rowIndex) => (
              <tr key={`row-${rowColor.name}`}>
                <td className="p-1 w-12 h-12 border border-slate-700">
                    <div className="w-full h-full rounded" style={{ backgroundColor: rowColor.hex }}></div>
                </td>
                {contrastGrid[rowIndex].map((ratio, colIndex) => (
                  <td key={`${rowColor.name}-${paletteArray[colIndex].name}`} className="p-1 w-12 h-12 border border-slate-700">
                    <div
                      className={`${getContrastColor(ratio)} w-full h-full flex items-center justify-center rounded text-white font-bold`}
                      title={`Contrast: ${ratio ? ratio.toFixed(2) : 'N/A'}`}
                    >
                      {ratio ? ratio.toFixed(1) : '—'}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       <div className="mt-4 flex flex-wrap gap-4 text-xs items-center">
            <span className="font-bold">Legend:</span>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-600"></div><span>AAA (&ge;7.0)</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-600"></div><span>AA (&ge;4.5)</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-600"></div><span>Fail (&lt;4.5)</span></div>
        </div>
    </section>
  );
};

export default AccessibilityGrid;
