import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Thông tin cấu hình Firebase của bạn
  apiKey: "AIzaSyBR0DNQBhs4qZyG6A8BPOXc1eUFVHNaViU",
  authDomain: "phatdat-e1208.firebaseapp.com",
  projectId: "phatdat-e1208",
  storageBucket: "phatdat-e1208.appspot.com",
  messagingSenderId: "720639822051",
  appId: "1:720639822051:web:97a75983f401e52afd5dd6",
  measurementId: "G-Y0Z4GB7ZQH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
