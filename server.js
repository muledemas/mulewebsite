const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const express = require("express");
const bodyParser = require("body-parser");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const SECRET_KEY = "mule_secret_key";

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(middlewares);

// Custom authentication endpoint
server.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = router.db.get("users").find({ username, password }).value();

  if (!user) {
    res.status(401).json({ error: "Invalid username or password" });
  } else {
    const token = jwt.sign({ userId: user.id }, SECRET_KEY);
    res.json({ token });
  }
});

// Custom profile endpoint
server.get("/profile", (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;
    const user = router.db.get("users").find({ id: userId }).value();
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json({ id: user.id, username: user.username, email: user.email });
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

// Custom registration endpoint
server.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  const existingUser = router.db.get('users').find({ username }).value();

  if (existingUser) {
    res.status(409).json({ error: 'Username already exists' });
  } else {
    const newUser = { id: Date.now(), username, password, email };
    router.db.get('users').push(newUser).write();
    res.json({ message: 'User registered successfully' });
  }
});

server.use(router);

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
