'use client';

import { createContext, useContext, ReactNode } from 'react';

interface PromptContextProps {
  symbolsLimit: string;
  symbolsUsed: string;
  limitRenewalDate: string;
}

const PromptContext = createContext<PromptContextProps | undefined>(undefined);

export const usePrompt = () => {
  const contextData = useContext(PromptContext);

  if (!contextData) {
    throw new Error('usePrompt must be used within a PromptProvider');
  }

  return contextData;
};

interface PromptProviderProps {
  children: ReactNode;
  value: PromptContextProps;
}

export const PromptProvider = ({ children, value }: PromptProviderProps) => (
  <PromptContext.Provider value={value}>{children}</PromptContext.Provider>
);
