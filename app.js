

require("dotenv").config();

const express = require("express");

const cors = require("cors");

require(".//config/db.config")();

const app = express();

app.use(express.json());

app.use(cors({ origin: "*" }));  

/* const connectToDb = require("./config/db.config"); */


const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const orderRouter  = require("./routes/order.routes")






/* 
app.use(function(req,res,next){
  res.header("Acess-Control-Allow-Origin","*");
  res.header("Acess-Control-Allow-Headers","Origin,X-requested-With,Content-Type,Accept");
  next();
}) */


/* async function init() {
  try { */
 


/*   const db = await connectToDb();



console.log("Conectado ao banco de dados!"); */

app.use("/api", userRouter);

app.use("/api", productRouter);

app.use("/api", orderRouter);

app.listen(Number(process.env.PORT), () =>
console.log(`Server up and running at port ${process.env.PORT}`)
);
  /* } catch (err) {
    console.log("Erro ao conectar ao banco de dados!", err);
    process.exit(1);
  } */
/* }
init();
 */