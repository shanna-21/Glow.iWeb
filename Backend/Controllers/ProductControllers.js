import express from "express";

import admin from "firebase-admin";
import serviceAccount from "../../glowi-4d056-firebase-adminsdk-yknz3-8438c6d8a7.json" assert {type: "json"};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

console.log(db);
export class ProductControllers {
  static async getProducts(req, res) {
    try {
      const productsCollection = db.collection("products");
      const productSnapshot = await productsCollection.get();

      const products = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res
        .status(500)
        .json({error: "Error fetching products", details: error.message});
    }
  }
}
