import React, {createContext, useState, useContext} from 'react';

interface DrawerContextType {
  isOpen: boolean | undefined;
  setIsOpen: (isOpen: boolean) => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const useDrawerContext = (): DrawerContextType => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};

interface DrawerContextProviderProps {
  children: React.ReactNode;
}

const DrawerContextProvider: React.FC<DrawerContextProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean | undefined>(false);

  const value: DrawerContextType = {
    isOpen,
    setIsOpen,
  };

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
};

export default DrawerContextProvider;
