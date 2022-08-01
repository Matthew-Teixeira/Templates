const db = require("../connection/db");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateJWT");

const getAllUsers = async (req, res) => {
  const allUsers = await db.query(
    "SELECT users.id, users.username, users.email FROM users"
  );
  res.json(allUsers.rows);
};

const getOneUser = async (req, res) => {
  const { id } = req.params;
  const oneUser = await db.query(
    "SELECT users.id, users.username, users.email FROM users WHERE id=$1",
    [id]
  );

  res.json(oneUser.rows[0]);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await db.query(
    "SELECT users.id, users.username, users.email, users.passhash FROM users WHERE users.email=$1",
    [email]
  );
  if (user.rowCount > 0) {
    const validUser = await bcrypt.compare(password, user.rows[0].passhash);
    if (validUser) {
      console.log(user.rows[0]);
      res.status(201).json({
        token: generateToken({
          id: user.rows[0].id,
          username: user.rows[0].username,
          email: user.rows[0].email,
        }),
      });
    } else {
      res.status(401).json({ message: "Not authorized user credentials" });
    }
  } else {
    res.status(401).json({ message: "Not authorized user credentials" });
  }
};

const registerUser = async (req, res) => {
  const { email, username, password } = req.body;
  console.log(password)

  const foundUser = await db.query(
    "SELECT email FROM users WHERE email = $1 OR username = $2",
    [email, username]
  );
  if (foundUser.rowCount === 0) {
    // register
    const hashedPass = await bcrypt.hash(password, 12);
    const newUser = await db.query(
      "INSERT INTO users(username, email, passhash) VALUES ($1, $2, $3) RETURNING username, email, id",
      [username, email, hashedPass]
    );
    console.log(newUser.rows[0]);
    res.status(201).json({
      token: generateToken(newUser.rows[0]),
    });
  } else {
    res.json({ loggedIn: false, status: "Email or Username already in use" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await db.query("DELETE FROM users WHERE id = $1", [id]);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.json({ message: err });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  loginUser,
  registerUser,
  deleteUser,
};
