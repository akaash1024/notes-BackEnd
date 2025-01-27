require("dotenv").config();
const express = require("express");
const connection = require("./config/db");
const userRoutes = require("./Routes/user.routes");
const todoRoutes = require("./Routes/todo.routes");
const cors = require("cors");

const PORT = process.env.PORT;

const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "https://notes-backend-zt5w.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));


app.use(express.json());

app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

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
