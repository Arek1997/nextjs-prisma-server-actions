"use client";

const useLocalStorage = <T>() => {
  const getValue = (key: string): T | null => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  };

  const setValue = (key: string, value: T) =>
    localStorage.setItem(key, JSON.stringify(value));

  return { getValue, setValue };
};

export default useLocalStorage;
