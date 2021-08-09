

//const cors = require("cors");
require("dotenv").config();
const express = require("express");

const connectToDb = require("./config/db.config");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const orderRouter  = require("./routes/order.routes")
var proxy = require('http-proxy-middleware')



const app = express();
app.use(cors({ origin: "*" }));  
/* 
app.use(function(req,res,next){
  res.header("Acess-Control-Allow-Origin","*");
  res.header("Acess-Control-Allow-Headers","Origin,X-requested-With,Content-Type,Accept");
  next();
}) */


async function init() {
  try {
 


  const db = await connectToDb();

    app.use(express.json());


    console.log("Conectado ao banco de dados!");

    app.use("/", userRouter);


console.log("Conectado ao banco de dados!");

app.use("/api", userRouter);

app.use("/api", productRouter);

app.use("/api", orderRouter);

    app.listen(4000, () => console.log("Servidor rodando na porta 4000!"));
  } catch (err) {
    console.log("Erro ao conectar ao banco de dados!", err);
    process.exit(1);
  }
}
init();
