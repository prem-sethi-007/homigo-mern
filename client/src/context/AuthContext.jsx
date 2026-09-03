import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';
import { propertyService } from '../services/propertyService';

const TOKEN_KEY = 'homigo_token';
const AuthContext = createContext(null);

function idsFromUser(user) {
  const arr = (user && user.favorites) || [];
  return new Set(arr.map(String));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }
    authService
      .me()
      .then((data) => {
        setUser(data.user);
        setFavoriteIds(idsFromUser(data.user));
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
        setFavoriteIds(new Set());
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const { token, user } = await authService.login(email, password);
    localStorage.setItem(TOKEN_KEY, token);
    setUser(user);
    setFavoriteIds(idsFromUser(user));
  }

  async function register(fields) {
    const { token, user } = await authService.register(fields);
    localStorage.setItem(TOKEN_KEY, token);
    setUser(user);
    setFavoriteIds(idsFromUser(user));
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setFavoriteIds(new Set());
  }

  function isFavorited(id) {
    return favoriteIds.has(String(id));
  }

  async function toggleFavorite(id) {
    const sid = String(id);
    const previous = favoriteIds;
    const next = new Set(previous);
    const was = previous.has(sid);
    if (was) next.delete(sid);
    else next.add(sid);
    setFavoriteIds(next);
    try {
      if (was) await propertyService.removeFavorite(sid);
      else await propertyService.addFavorite(sid);
    } catch (err) {
      setFavoriteIds(previous);
      throw err;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        favoriteIds,
        isFavorited,
        toggleFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
