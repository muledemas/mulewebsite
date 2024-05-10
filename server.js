// const jsonServer = require("json-server");
// const jwt = require("jsonwebtoken");
// const express = require("express");
// const bodyParser = require("body-parser");

// const server = jsonServer.create();
// const router = jsonServer.router("db.json");
// const middlewares = jsonServer.defaults();

// const SECRET_KEY = "mule_secret_key";

// server.use(bodyParser.urlencoded({ extended: true }));
// server.use(bodyParser.json());
// server.use(middlewares);

// // Custom authentication endpoint
// server.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   const user = router.db.get("users").find({ username, password }).value();

//   if (!user) {
//     res.status(401).json({ error: "Invalid username or password" });
//   } else {
//     const token = jwt.sign({ userId: user.id }, SECRET_KEY);
//     res.json({ token });
//   }
// });

// // Custom profile endpoint
// server.get("/profile", (req, res) => {
//   const token = req.headers.authorization.replace("Bearer ", "");
//   try {
//     const decoded = jwt.verify(token, SECRET_KEY);
//     const userId = decoded.userId;
//     const user = router.db.get("users").find({ id: userId }).value();
//     if (!user) {
//       res.status(404).json({ error: "User not found" });
//     } else {
//       res.json({ id: user.id, username: user.username, email: user.email });
//     }
//   } catch (error) {
//     res.status(401).json({ error: "Invalid token" });
//   }
// });

// // Custom registration endpoint
// server.post('/register', (req, res) => {
//   const { username, password, email } = req.body;
//   const existingUser = router.db.get('users').find({ username }).value();

//   if (existingUser) {
//     res.status(409).json({ error: 'Username already exists' });
//   } else {
//     const newUser = { id: Date.now(), username, password, email };
//     router.db.get('users').push(newUser).write();
//     res.json({ message: 'User registered successfully' });
//   }
// });

// server.use(router);

// const PORT = 5000;
// server.listen(PORT, () => {
//   console.log(`JSON Server is running on port ${PORT}`);
// });


const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const PORT = 5000;
const SECRET_KEY = "mule_secret_key";

const usersFilePath = path.join(__dirname, "db.json");
let usersData = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname === "/login" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const { username, password } = JSON.parse(body);
      const user = usersData.users.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid username or password" }));
      } else {
        const token = jwt.sign({ userId: user.id }, SECRET_KEY);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ token }));
      }
    });
  } else if (pathname === "/profile" && req.method === "GET") {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Authorization token missing" }));
      return;
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const userId = decoded.userId;
      const user = usersData.users.find((u) => u.id === userId);

      if (!user) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "User not found" }));
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            id: user.id,
            username: user.username,
            email: user.email,
          })
        );
      }
    } catch (error) {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid token" }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Endpoint not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
