import React, { createContext, useContext, useState } from 'react';
import { getAccount } from '@/api/auth';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUserState] = useState(null);
  
  async function getUser(sessionId) {
    const user = await getAccount(sessionId);
    setUserState(user);
    return user;
  }

  function setUser(user) {
    setUserState(user);
  }
  
  return (
    <UserContext.Provider value={{ user, getUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);