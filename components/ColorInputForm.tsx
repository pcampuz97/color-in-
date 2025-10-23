
import React, { useState } from 'react';

interface ColorInputFormProps {
  onGenerate: (color: string) => void;
  initialColor: string;
}

const ColorInputForm: React.FC<ColorInputFormProps> = ({ onGenerate, initialColor }) => {
  const [color, setColor] = useState(initialColor);
  const [error, setError] = useState('');

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(newColor)) {
      setError('Please enter a valid hex color (e.g., #RRGGBB)');
    } else {
      setError('');
    }
  };

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!error && color) {
      onGenerate(color);
    }
  };

  return (
    <section className="bg-slate-800 p-6 rounded-xl shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
        <label htmlFor="color-input" className="sr-only">Base Color</label>
        <div className="relative w-full sm:w-auto flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <label htmlFor="color-picker" className="cursor-pointer">
                    <span className="w-5 h-5 block rounded-full border-2 border-slate-500" style={{ backgroundColor: error ? 'transparent' : color }}></span>
                </label>
                <input
                    id="color-picker"
                    type="color"
                    value={color}
                    onChange={handleColorPickerChange}
                    className="sr-only"
                    aria-label="Color Picker"
                />
            </div>
            <input
                id="color-input"
                type="text"
                value={color}
                onChange={handleColorChange}
                className="w-full bg-slate-700 text-white placeholder-slate-400 rounded-md py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="#3b82f6"
            />
        </div>
        <button
          type="submit"
          disabled={!!error || !color}
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
        >
          Generate
        </button>
      </form>
      {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
    </section>
  );
};

export default ColorInputForm;
