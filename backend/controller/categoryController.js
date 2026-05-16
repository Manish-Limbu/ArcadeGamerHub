import { request } from "express";
import db from "../connection/db.js";

export const addCategory = (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Category name is required"
    });
  }

  const q = "INSERT INTO categories (name, description) VALUES (?, ?)";

  db.query(q, [name, description || null], (err, result) => {
    if (err) {
      console.error("Database Error:", err.message);
      return res.status(500).json({
        success: false,
        message: "Failed to create category",
        error: err.message
      });
    }

    return res.status(201).json({
      success: true,
      message: "Category added successfully",
      categoryId: result.insertId
    });
  });
};

export const getCategory = (req, res) => {
  const q = "SELECT * FROM categories ORDER BY name ASC";

  db.query(q, (err, result) => {
    if (err) {
      console.error("Database Error:", err.message);
      return res.status(500).json({
        success: false,
        message: "Error while fetching categories",
        error: err.message
      });
    }

    return res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      count: result.length,
      data: result
    });
  });
};

export const updateCategory = (req, res) => {
  const categoryId = req.params.id;
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Category name is required"
    });
  }

  const q = "UPDATE categories SET name = ?, description = ? WHERE category_id = ?";

  db.query(q, [name, description || null, categoryId], (err, result) => {
    if (err) {
      console.error("Database Error:", err.message);
      return res.status(500).json({
        success: false,
        message: "Failed to update category",
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully"
    });
  });
};