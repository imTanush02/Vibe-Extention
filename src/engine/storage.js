/**
 * Helper utility for Hybrid Storage (LocalStorage + IndexedDB)
 */

// Chote data ke liye purana logic
export const storage = {
  get: (key, defaultValue) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading ${key}:`, error);
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Agar yahan error aaya (like QuotaExceeded), toh console mein dikhega
      console.error(`LocalStorage Full! Error writing ${key}:`, error);
    }
  },
};

// --- Badi Files (GIFs) ke liye IndexedDB Logic ---

const DB_NAME = "VibeBoardDB";
const STORE_NAME = "wallpapers";

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const wallpaperStorage = {
  save: async (id, blob) => {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(blob, id);
    return tx.complete;
  },
  get: async (id) => {
    const db = await openDB();
    return new Promise((resolve) => {
      const request = db.transaction(STORE_NAME).objectStore(STORE_NAME).get(id);
      request.onsuccess = () => resolve(request.result);
    });
  }
};