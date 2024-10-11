import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBrLdV7K9-cIidQTkcQgjBScknxtMKh-Ec",
  authDomain: "glowi-4d056.firebaseapp.com",
  projectId: "glowi-4d056",
  storageBucket: "glowi-4d056.appspot.com",
  messagingSenderId: "566613838757",
  appId: "1:566613838757:web:e1ad6ec2b1dc3e7614364c",
  measurementId: "G-47FJH92THE",
};


const fireApp = initializeApp(firebaseConfig);

const db = getFirestore(fireApp);
const storages = getStorage(fireApp);

export { db, storages };
