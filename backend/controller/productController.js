import { request } from "express";
import db from "../connection/db.js";

export const addProduct = (req, res) => {
  const {
    category_id,
    sku,
    name,
    description,
    base_price,
    discount_price,
    stock_quantity,
    image_url,
    is_digital
  } = req.body;

  if (!name || base_price === undefined || stock_quantity === undefined) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: name, base_price, or stock_quantity."
    });
  }

  const q = `
    INSERT INTO products 
    (category_id, sku, name, description, base_price, discount_price, stock_quantity, image_url, is_digital) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    category_id || null,
    sku || null,
    name,
    description || null,
    base_price,
    discount_price || null,
    stock_quantity,
    image_url || null,
    is_digital
  ];

  db.query(q, values, (err, result) => {
    if (err) {
      console.error("Database Error:", err);

      return res.status(500).json({
        success: false,
        message: "An error occurred while adding the product to the database.",
        error: err.message
      });
    }

    return res.status(201).json({
      success: true,
      message: "Product added successfully!",
      productId: result.insertId 
    });
  });
};

export const getAllProducts = (req, res) => {
  const q = `
  SELECT p.*, c.name AS category_name 
  FROM products p 
  LEFT JOIN categories c ON p.category_id = c.category_id 
  ORDER BY p.created_at DESC
`;

  db.query(q, (err, result) => {
    if (err) {
      console.error("Database Error:", err.message);
      return res.status(500).json({
        success: false,
        message: "Error while fetching products",
        error: err.message
      });
    }

    return res.status(200).json({
      success: true,
      count: result.length,
      data: result
    });
  });
};

export const getSingleProduct = (req, res) => {
  const productId = req.params.id;
  const q = "SELECT * FROM products WHERE product_id = ?";

  db.query(q, [productId], (err, result) => {
    if (err) {
      console.error("Database Error:", err.message);
      return res.status(500).json({
        success: false,
        message: "Error while fetching the product",
        error: err.message
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: result[0]
    });
  });
};

export const updateProduct = (req, res) => {
  const productId = req.params.id;
  const {
    category_id,
    sku,
    name,
    description,
    base_price,
    discount_price,
    stock_quantity,
    image_url,
    is_digital
  } = req.body;

  const q = `
    UPDATE products 
    SET category_id = ?, sku = ?, name = ?, description = ?, 
        base_price = ?, discount_price = ?, stock_quantity = ?, 
        image_url = ?, is_digital = ? 
    WHERE product_id = ?
  `;

  const values = [
    category_id,
    sku,
    name,
    description,
    base_price,
    discount_price,
    stock_quantity,
    image_url,
    is_digital,
    productId
  ];

  db.query(q, values, (err, result) => {
    if (err) {
      console.error("Database Error:", err.message);
      return res.status(500).json({
        success: false,
        message: "Failed to update product",
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully"
    });
  });
};

export const deleteProduct = (req, res) => {
  const productId = req.params.id;
  const q = "DELETE FROM products WHERE product_id = ?";

  db.query(q, [productId], (err, result) => {
    if (err) {
      console.error("Database Error:", err.message);
      return res.status(500).json({
        success: false,
        message: "Failed to delete product",
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });
  });
};