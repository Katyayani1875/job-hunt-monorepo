import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../utils/axios'; // ✅ use the custom axios instance

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/users/me'); // ✅ uses token & baseURL
        setUser(res.data);
      } catch (err) {
        console.error('Fetch user error:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await api.post('/auth/logout'); 
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;    