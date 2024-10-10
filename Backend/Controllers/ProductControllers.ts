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
import { storages, db } from "../config.ts";
import { Request, Response } from "express";
interface Product {
  id: string;
  [key: string]: any;
}

const productsCollection = collection(db, "products");

export class ProductControllers {
  static async getProducts(req: Request, res: Response) {
    try {
      const productSnapshot = await getDocs(productsCollection);
      const products: Product[] = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Error fetching courses" });
    }
  }

}