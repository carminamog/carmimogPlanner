import { useState, useEffect } from 'react';

/**
 * Custom hook para usar localStorage de forma sencilla
 * @param {string} key - Nombre de la clave en localStorage
 * @param {any} initialValue - Valor inicial por defecto
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const savedItem = localStorage.getItem(key);
      return savedItem ? JSON.parse(savedItem) : initialValue;
    } catch (error) {
      console.error('Error leyendo localStorage', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error guardando en localStorage', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
