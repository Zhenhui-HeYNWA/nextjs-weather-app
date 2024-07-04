'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface WindowContextProps {
  width: number;
  height: number;
  isMobile: boolean;
}

const WindowContext = createContext<WindowContextProps | undefined>(undefined);

export const useWindowContext = () => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error(
      'useWindowContext must be used within a WindowContextProvider'
    );
  }
  return context;
};

interface WindowContextProviderProps {
  children: ReactNode;
}

export const WindowContextProvider = ({
  children,
}: WindowContextProviderProps) => {
  const [windowSize, setWindowSize] = useState<WindowContextProps>({
    width: 0,
    height: 0,
    isMobile: false,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 500,
      });
    };

    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <WindowContext.Provider value={windowSize}>
      {children}
    </WindowContext.Provider>
  );
};
