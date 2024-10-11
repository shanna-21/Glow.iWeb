import express from "express"; // Import express as default
import {
  collection,
  getDocs,
  addDoc,
  doc,
  query,
  where,
  deleteDoc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { storages, db } from "../config.js"; // Ensure the path is correct
const { Request, Response } = express; // Destructure Request and Response from express

const productsCollection = collection(db, "products");

export class ProductControllers {
  static async getProducts(req = Request, res = Response) { // Use req and res as parameters
    try {
      const productSnapshot = await getDocs(productsCollection);
      const products = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Error fetching products" });
    }
  }
}
