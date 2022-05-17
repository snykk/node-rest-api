require("dotenv").config();
const express = require("express");
const cors = require("cors");
const todosRoutes = require("./routes/todos");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const dbSycn = require("./utils/dbSync");

const PORT = 5000;

dbSycn();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/", todosRoutes);
app.use("/api/", usersRoutes);
app.use("/api/auth/", authRoutes);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
