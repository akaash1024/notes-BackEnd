require("dotenv").config();
const path = require("path")
const express = require("express");
const connection = require("./config/db");
const userRoutes = require("./Routes/user.routes");
const todoRoutes = require("./Routes/todo.routes");
const homeRoutes = require("./Routes/home.routes");
const cors = require("cors");

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const staticPath = path.join(__dirname, "public");
app.use(express.static(staticPath));



app.use("/users", userRoutes);
app.use("/todos", todoRoutes);
app.set("view engine", "ejs");

app.get("/", homeRoutes);

app.listen(PORT, async () => {
  try {
    await connection(process.env.MONGO_URI);
    console.log(`Database is connected`);
    console.log(`⚙️  Server is listening at http://localhost:${PORT}`);
  } catch (error) {
    console.error(error.message);
  }
});
