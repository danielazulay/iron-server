require("dotenv").config();
const express = require("express");

const connectToDb = require("./config/db.config");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const orderRouter = require("./routes/order.routes");

const app = express();
const cors = require("cors");
app.use(cors({ origin: process.env.REACT_APP_URL }));
app.use(express.json());

const db = connectToDb();

console.log("Conectado ao banco de dados!");

app.use("/", userRouter);

app.use("/", productRouter);

app.use("/", orderRouter);

app.listen(Number(process.env.PORT), () => {
  console.log(`Server up and running at port ${process.env.PORT}`);
});
