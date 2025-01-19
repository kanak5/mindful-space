
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyBiRukKCP3QCNwR3eolBkPNZ3shOgOj5Do",
  authDomain: "mindfull-space-2ac8b.firebaseapp.com",
  projectId: "mindfull-space-2ac8b",
  storageBucket: "mindfull-space-2ac8b.firebasestorage.app",
  messagingSenderId: "521469854692",
  appId: "1:521469854692:web:87cd0a094a5cc2864cfdf1",
  measurementId: "G-MD6DYSPH4F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const analytics = getAnalytics(app);
export { auth }