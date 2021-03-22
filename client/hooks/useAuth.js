import { useEffect, useState } from 'react';
import api from 'services/api';
import StorageService from 'services/local-storage';

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const instance = new StorageService();

  useEffect(() => {
    const token = instance.getCredentials();
    if (token) setToken(token);
    else setToken('');
  }, []);

  const setResToState = (data) => {
    const tkn = data.token;
    setToken(tkn);
    setUser(data.user);
    instance.setCredentials(tkn);
  };

  const login = async (credentials) => {
    try {
      const res = await api.post('/auth/login', credentials);
      setResToState(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const register = async (credentials) => {
    try {
      const res = await api.post('/auth/register', credentials);
      await setResToState(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    instance.removeCredentials();
    setToken('');
  };

  return {
    login,
    register,
    token,
    user,
    logout,
    setUser,
  };
};

export default useAuth;
