import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyARwWcCWVzDRwvl_mgcv2zSfJwLxmVPthI",
  authDomain: "rsla-tools.firebaseapp.com",
  projectId: "rsla-tools",
  storageBucket: "rsla-tools.firebasestorage.app",
  messagingSenderId: "481375554832",
  appId: "1:481375554832:web:d0b4c6bdbc6d677fd22995",
  measurementId: "G-9W2XXEJQFQ"
};

// Initialize Firebase only if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export { app, auth };
