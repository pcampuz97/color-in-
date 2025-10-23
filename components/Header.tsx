
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
        Accessible Color Palette Generator
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
        Create beautiful and accessible color scales instantly. Test combinations and ensure your designs are readable for everyone.
      </p>
    </header>
  );
};

export default Header;
