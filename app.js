require("dotenv").config();
const express = require("express");
const app = express();
const connection = require("./config/db");
const userRoutes = require("./Routes/user.routes");
const todoRoutes = require("./Routes/todo.routes");
const cors = require("cors");

const PORT = process.env.PORT;

// let's tackle cors
const corsOptions = {
  // origin: "http://localhost:5173",
  origin: (origin, callback) => {
    // Check if the origin is allowed
    const allowedOrigins = ["http://localhost:5173"];
    const isAllowed = allowedOrigins.includes(origin);
    callback(null, isAllowed ? origin : false);
  },
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("api/users", userRoutes);
app.use("api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.json({ msg: "Hello Express" });
});

app.listen(PORT, async () => {
  try {
    await connection(process.env.MONGO_URI);
    console.log(`Database is connected`);
    console.log(`⚙️  Server is listening at http://localhost:${PORT}`);
  } catch (error) {
    console.error(error.message);
  }
});
