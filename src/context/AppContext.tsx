import { createContext, useContext, ReactNode } from 'react';
import { translations } from '../i18n/translations';
import { colors } from '../theme/colors';

export type AppContextValue = {
  t: (key: string) => string;
  colors: typeof colors;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const t = (key: string) => translations.fr[key] ?? key;

  return (
    <AppContext.Provider value={{ t, colors }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}