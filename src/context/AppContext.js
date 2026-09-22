import { createContext, useContext } from 'react';
import { translations } from '../i18n/translations';
import { colors } from '../theme/colors';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const t = (key) => translations.fr[key] ?? key;

  return (
    <AppContext.Provider value={{ t, colors }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}