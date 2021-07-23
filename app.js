require("dotenv").config();
const express = require("express");

const connectToDb = require("./config/db.config");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");

const app = express();

app.use(express.json());

async function init() {
  try {
    await connectToDb();

    console.log("Conectado ao banco de dados!");

    app.use("/", userRouter);

    app.use("/", productRouter);



    app.listen(3000, () => console.log("Servidor rodando na porta 4000!"));
  } catch (err) {
    console.log("Erro ao conectar ao banco de dados!", err);
    process.exit(1);
  }
}
init();