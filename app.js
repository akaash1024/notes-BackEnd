require("dotenv").config();
const express = require("express");
const connection = require("./config/db");
const userRoutes = require("./Routes/user.routes");
const todoRoutes = require("./Routes/todo.routes");
const cors = require("cors");

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
// Add logging middleware to see incoming requests
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.path);
  console.log('Origin:', req.headers.origin);
  next();
});

app.use(cors({
  origin: 'http://localhost:5173',  
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders:  ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.options('*', cors()) 



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
