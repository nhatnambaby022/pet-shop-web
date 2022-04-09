require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./routes/auth");
const itemsRouter = require("./routes/items");
const itemstypeRouter = require("./routes/itemType");
const cartRouter = require("./routes/cart");
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@webthucung.f5kvu.mongodb.net/webthucung?retryWrites=true&w=majority`
    );
    console.log(`MongoDB connected!`);
  } catch (error) {
    console.log(error.message);
  }
};

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/items", itemsRouter);
app.use("/api/types", itemstypeRouter);
app.use("/api/cart", cartRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
