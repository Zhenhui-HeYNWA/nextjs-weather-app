import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Context,
} from 'react';

interface WindowSize {
  width: number;
  height: number;
}

interface WindowContext extends WindowSize {
  isMobile: boolean;
}

const WindowContext: Context<WindowContext | undefined> = createContext<
  WindowContext | undefined
>(undefined);

interface WindowContextProviderProps {
  children: ReactNode;
}

export function WindowContextProvider({
  children,
}: WindowContextProviderProps): JSX.Element {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = (): void => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const value: WindowContext = {
    ...windowSize,
    isMobile: windowSize.width < 500,
  };

  return (
    <WindowContext.Provider value={value}>{children}</WindowContext.Provider>
  );
}

export const useWindowContext = (): WindowContext => {
  const context = useContext(WindowContext);
  if (context === undefined) {
    throw new Error(
      'useWindowContext must be used within a WindowContextProvider'
    );
  }
  return context;
};
