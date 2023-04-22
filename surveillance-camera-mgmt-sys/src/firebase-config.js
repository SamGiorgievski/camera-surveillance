import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAiK2WOPPb4tcuvs2aj-pPXfBZjuPuvzfM",
  authDomain: "camera-surveillance-18a9b.firebaseapp.com",
  projectId: "camera-surveillance-18a9b",
  storageBucket: "camera-surveillance-18a9b.appspot.com",
  messagingSenderId: "879266863323",
  appId: "1:879266863323:web:c5677ee1f6c291008f54fe",
  measurementId: "G-PCP4624DQD",
  storageBucket: "camera-surveillance-18a9b.appspot.com"
};

const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);