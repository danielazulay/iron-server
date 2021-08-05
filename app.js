


require("dotenv").config();
const express = require("express");

const connectToDb = require("./config/db.config");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const orderRouter  = require("./routes/order.routes")
//const cors = require("cors");


const app = express();




async function init() {
  try {
    const db = await connectToDb();
    app.use(express.json());

    console.log("Conectado ao banco de dados!");
   /*  app.use(cors({ origin: process.env.REACT_APP_URL })); */
    app.use("/", userRouter);


console.log("Conectado ao banco de dados!");

app.use("/", userRouter);

app.use("/", productRouter);

app.use("/", orderRouter);

    app.listen(4000, () => console.log("Servidor rodando na porta 4000!"));
  } catch (err) {
    console.log("Erro ao conectar ao banco de dados!", err);
    process.exit(1);
  }
}
init();
