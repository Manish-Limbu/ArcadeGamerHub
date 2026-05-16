

export const getAllUsers = (req, res) => {
  const q = `
  SELECT * FROM users ORDER BY user_id ASC
`;

  db.query(q, (err, result) => {
    if (err) {
      console.error("Database Error:", err.message);
      return res.status(500).json({
        success: false,
        message: "Error while fetching users",
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

export const getSingleUser = (req, res) => {
  const userId = req.params.id;
  const q = "SELECT * FROM users WHERE user_id = ?";

  db.query(q, [userId], (err, result) => {
    if (err) {
      console.error("Database Error:", err.message);
      return res.status(500).json({
        success: false,
        message: "Error while fetching the user",
        error: err.message
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: result[0]
    });
  });
};