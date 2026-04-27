import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [page, setPage] = useState('landing'); // landing | login | register | dashboard | wizard | success
  const [user, setUser] = useState(null);
  const [wizardData, setWizardData] = useState({});
  const [wizardStep, setWizardStep] = useState(0);
  const [antragType, setAntragType] = useState(null);

  const login = (email, name) => {
    setUser({ email, name: name || email.split('@')[0] });
    setPage('dashboard');
  };

  const logout = () => {
    setUser(null);
    setPage('landing');
  };

  const startWizard = (type) => {
    setAntragType(type);
    setWizardStep(0);
    setWizardData({});
    setPage('wizard');
  };

  const updateWizardData = (data) => {
    setWizardData(prev => ({ ...prev, ...data }));
  };

  return (
    <AppContext.Provider value={{
      page, setPage,
      user, login, logout,
      wizardData, updateWizardData,
      wizardStep, setWizardStep,
      antragType, startWizard,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
