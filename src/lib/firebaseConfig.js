// lib/firebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";

// Your Firebase configuration (you can keep these inline if it’s a personal/test project)
const firebaseConfig = {
  apiKey: "AIzaSyA6sRB1x6Sjwcgf09-GmyJCQJMFNpEPUes",
  authDomain: "nitinduameetings.firebaseapp.com",
  projectId: "nitinduameetings",
  storageBucket: "nitinduameetings.firebasestorage.app",
  messagingSenderId: "276212884043",
  appId: "1:276212884043:web:e81226950df7a121dfe3ce",
};

// Prevent re-initializing Firebase multiple times (Next.js hot reload fix)
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
