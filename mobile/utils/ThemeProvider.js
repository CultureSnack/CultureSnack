import React, { createContext, useContext, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { getCurrentBreakpoint, baseFontSize, spacing, colors, fonts } from './theme';

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  const [breakpoint, setBreakpoint] = useState(getCurrentBreakpoint());

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setBreakpoint(getCurrentBreakpoint());
    });

    return () => subscription.remove();
  }, []);

  const value = {
    breakpoint,
    fontSize: baseFontSize,
    spacing,
    colors,
    fonts,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 