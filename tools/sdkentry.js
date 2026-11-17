import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged, setPersistence, browserLocalPersistence, indexedDBLocalPersistence } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, deleteDoc, onSnapshot } from "firebase/firestore";
window.FBSDK = { initializeApp, getAuth, signInAnonymously, onAuthStateChanged, setPersistence, browserLocalPersistence, indexedDBLocalPersistence, getFirestore, doc, getDoc, setDoc, deleteDoc, onSnapshot };
