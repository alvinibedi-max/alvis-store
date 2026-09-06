import {createContext, useContext, useEffect, useState, type ReactNode} from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({children, defaultTheme = 'light'}: {children: ReactNode; defaultTheme?: Theme}) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const stored = localStorage.getItem('alvis-theme') as Theme | null;
    if (stored) {
      setThemeState(stored);
      document.documentElement.classList.toggle('dark', stored === 'dark');
    }
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('alvis-theme', t);
    document.documentElement.classList.toggle('dark', t === 'dark');
  };

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return <ThemeContext.Provider value={{theme, setTheme, toggleTheme}}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
