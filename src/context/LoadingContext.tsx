import React, {createContext, useState, useContext} from 'react';

interface LoadingContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoadingContext = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error(
      'useLoadingContext must be used within a LoadingContextProvider',
    );
  }
  return context;
};

interface LoadingContextProviderProps {
  children: React.ReactNode;
}

const LoadingContextProvider: React.FC<LoadingContextProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const value: LoadingContextType = {
    loading,
    setLoading,
  };

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

export default LoadingContextProvider;
