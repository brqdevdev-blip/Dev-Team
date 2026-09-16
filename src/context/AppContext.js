import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations } from '../i18n/translations';
import { colors } from '../theme/colors';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [lang, setLang] = useState('fr');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('lang').then((l) => {
      if (l) setLang(l);
      setReady(true);
    });
  }, []);

  const changeLang = (l) => {
    setLang(l);
    AsyncStorage.setItem('lang', l);
  };

  const t = (key) => translations[lang][key] ?? translations.fr[key] ?? key;

  return (
    <AppContext.Provider value={{ lang, ready, changeLang, t, colors }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}