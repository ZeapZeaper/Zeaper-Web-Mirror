'use client';
import { createContext, ReactNode, useEffect, useState } from 'react';

type ThemeContextType = 'light' | 'dark';

interface ThemeContextInterface {
  theme: ThemeContextType;
  toggleTheme: () => void;
  dimBackground: boolean;
  setDimBackground: (dim: boolean) => void;
  isSideBarOpen: boolean;
  toggleSideBar: () => void;
}

export const ThemeContext = createContext<ThemeContextInterface>({
  theme: 'light',
  toggleTheme: () => {},
  dimBackground: false,
  setDimBackground: () => {},
  isSideBarOpen: false,
  toggleSideBar: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeContextType>('light');
  const [dimBackground, setDimBackground] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme as ThemeContextType);
      return;
    }
  }, []);

  const toggleTheme = () => {
    setTheme((theme) => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, dimBackground, setDimBackground , isSideBarOpen, toggleSideBar }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
