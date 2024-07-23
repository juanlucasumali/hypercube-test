import React, { createContext, useState, ReactNode, useContext } from 'react';

interface AppContextProps {
  inRoom: boolean;
  setInRoom: (value: boolean) => void;
  selectedRoom: string | null;
  setSelectedRoom: (room: string | null) => void;
  updateRoom: (roomId: string) => void;
}

const defaultState = {
  inRoom: false,
  setInRoom: () => {},
  selectedRoom: null,
  setSelectedRoom: () => {},
  updateRoom: () => {},
};

export const AppContext = createContext<AppContextProps>(defaultState);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [inRoom, setInRoom] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const updateRoom = (roomId: string) => {
    // Logic to update room based on roomId
    console.log(`Updating room to: ${roomId}`);
  };

  return (
    <AppContext.Provider value={{ inRoom, setInRoom, selectedRoom, setSelectedRoom, updateRoom }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
};
