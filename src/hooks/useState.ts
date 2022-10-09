import { useState as useStateUnsynced, useEffect } from "react";

export const useStateStoragePrefix = "slix:useState:";

export function useState<T>(key: string, initialValue: T) {
  const _key = useStateStoragePrefix + key;
  const state = useStateUnsynced(initialValue);

  const onStorageUpdate = (event: StorageEvent) => {
    if (event.key === _key && event.newValue) {
      state[1](JSON.parse(event.newValue));
    }
  };

  useEffect(() => {
    const storedValue = localStorage.getItem(_key);
    state[1](storedValue ? JSON.parse(storedValue) : initialValue);
    window.addEventListener("storage", onStorageUpdate);
    return () => {
      window.removeEventListener("storage", onStorageUpdate);
    };
  }, []);

  const stateObject = new Object();

  Object.defineProperty(stateObject, "value", {
    get: () => {
      return state[0];
    },
    set: (newValue: T) => {
      if (
        newValue !== state[0] &&
        JSON.stringify(newValue) !== localStorage.getItem(_key)
      ) {
        state[1](newValue);
        localStorage.setItem(_key, JSON.stringify(newValue));
      }
    },
  });

  return stateObject as {
    value: T;
  };
}
