import { Router } from "express";
import db from "../database.js";
const router = Router();

//GET all products, categories -and manufacturer details for each product

router.get("/", (req, res, next) => {
  try {
    const stmt = db.prepare(
      `
        SELECT products.name AS Product_Name, categories.name AS Category, manufactors.name AS
        Manufacturer_Name
        FROM products
        JOIN categories ON products.category_id = categories.id
        JOIN manufactors ON products.manufactor_id = manufactors.id
        `
    );
    const products = stmt.all();
    console.log(products);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

//GET a specific product based on ID
router.get("/:id", (req, res, next) => {
  try {
    //Parse id into an integer
    const id = parseInt(req.params.id, 10);

    //Validate input
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("Invalid ID formatting");
    }
    const stmnt = db.prepare("SELECT * FROM products WHERE id = ?");
    const product = stmnt.get(id);

    //Check if the product is found
    if (!product) {
        res.json({Msg:`No product where found with ID of ${id}` })
      console.log(`No product where found with ID of ${id}`);
      return;
    }
    //Send the product data back to client 
    res.json(product);
  } catch (error) {
    console.error(`Error fetching product with id of ${req.params.id}`);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

export default router;
