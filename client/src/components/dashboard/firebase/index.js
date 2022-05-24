import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAQrtyGENGwVjtw0-w2j4fD0ufeMf2Ach0",
  authDomain: "pet-web-shop.firebaseapp.com",
  projectId: "pet-web-shop",
  storageBucket: "pet-web-shop.appspot.com",
  messagingSenderId: "758036305609",
  appId: "1:758036305609:web:ee0a48e51563c6f7d2df18",
  measurementId: "G-1R8Z2RNYTD",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export { storage, firebaseApp as default };
