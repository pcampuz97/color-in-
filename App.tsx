
import React, { useState, useCallback, useMemo } from 'react';
import type { PaletteScale } from './types';
import { generateColorScale } from './services/colorService';
import Header from './components/Header';
import ColorInputForm from './components/ColorInputForm';
import PaletteDisplay from './components/PaletteDisplay';
import AccessibilityGrid from './components/AccessibilityGrid';
import AccessibilityPlayground from './components/AccessibilityPlayground';

const DEFAULT_COLOR = '#3b82f6'; // A nice blue to start with

const App: React.FC = () => {
  const [palette, setPalette] = useState<PaletteScale>(() => generateColorScale(DEFAULT_COLOR));

  const handleGeneratePalette = useCallback((baseColor: string) => {
    try {
      const newPalette = generateColorScale(baseColor);
      setPalette(newPalette);
    } catch (error) {
      console.error("Failed to generate palette:", error);
      // Here you could add user-facing error handling, e.g., a toast notification
    }
  }, []);
  
  const paletteArray = useMemo(() => {
    // FIX: Use `Object.keys` to map over the palette. This provides better type
    // inference than `Object.entries`, which was causing `color` to be of type `unknown`.
    return Object.keys(palette).map((name) => ({
      name,
      ...palette[name],
    }));
  }, [palette]);

  return (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col gap-12">
            <ColorInputForm onGenerate={handleGeneratePalette} initialColor={DEFAULT_COLOR} />
            <PaletteDisplay palette={palette} />
          </div>
          <div className="flex flex-col gap-12">
            <AccessibilityPlayground palette={palette} />
            <AccessibilityGrid paletteArray={paletteArray} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;