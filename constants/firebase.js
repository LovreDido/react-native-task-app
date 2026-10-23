import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBECkRKOwGU-AuCelCCJrhqMNLlOyemmcA",
  authDomain: "seminar-mobilne-7fb47.firebaseapp.com",
  projectId: "seminar-mobilne-7fb47",
  storageBucket: "seminar-mobilne-7fb47.firebasestorage.app",
  messagingSenderId: "1002843323097",
  appId: "1:1002843323097:web:14ee4aee465e3b1ac09cc8"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);