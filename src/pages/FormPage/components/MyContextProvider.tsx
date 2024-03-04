import React, { ReactNode, useState, useContext } from 'react';

interface MyContextType {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  currentRecord: any;
  setCurrentRecord: React.Dispatch<React.SetStateAction<any>>;
}

export const MyContext = React.createContext<MyContextType | undefined>(
  undefined,
);

interface MyContextProviderProps {
  children: ReactNode;
}

export function MyContextProvider({ children }: MyContextProviderProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  return (
    <MyContext.Provider
      value={{ modalVisible, setModalVisible, currentRecord, setCurrentRecord }}
    >
      {children}
    </MyContext.Provider>
  );
}
