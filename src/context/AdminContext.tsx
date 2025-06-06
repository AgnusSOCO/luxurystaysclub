import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  verifyAccess: (token: string) => boolean;
  clearAccess: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
      verifyAccess(storedToken);
    }
  }, []);

  const verifyAccess = (token: string) => {
    const validToken = process.env.ADMIN_TOKEN;
    
    if (validToken && token === validToken) {
      setIsAdmin(true);
      localStorage.setItem('adminToken', token);
      return true;
    }
    return false;
  };

  const clearAccess = () => {
    setIsAdmin(false);
    localStorage.removeItem('adminToken');
  };

  return (
    <AdminContext.Provider value={{ isAdmin, verifyAccess, clearAccess }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};