const router = require("express").Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser")

const productModule = require("../models/Product.model")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const orderModule = require("../models/Order.model")
const isAdmin = require("../middlewares/isAdmin")
const userModule = require("../models/User.model")


router.post("/newOrder",isAuthenticated,attachCurrentUser,async(req,res,next)=>{


  
        // Extrair o id do projeto dos parâmetros de rota
        try {
            const result = await orderModule.create({
              
                ...req.body
            });
 
const resposta = new Promise((resolve, reject) => { 
    req.body.products.map(async(item)=>{
   
    const productItem = await productModule.findOneAndUpdate({_id:item.productId},{$inc:{unity:-item.qtt}},{new:true})

    const itenUpdated = await orderModule.findOneAndUpdate({_id:result._id},{$inc:{value:(productItem.price*item.qtt).toFixed(2)}},{new:true})

resolve(productItem,itenUpdated)


})
})

Promise.all(resposta).then((data)=>{ return res.status(200).json(data)}).catch(err => console.log(err) ) 
return res.status(200).json(result)
        }catch(err){next(err)}

    })

    // Criar uma sessão de Checkout no Stripe
router.post("/create-checkout-session", isAuthenticated, async (req, res) => {
    // Array para segurar dados dos produtos
    const line_items = [];
  console.log(req.body)
    try {
      // Antes de liberar a venda, verifica se tem quantidade em estoque
      for (let product of req.body.products) {
        const foundProduct = await productModule.findOne({
          _id: product.productId,
        });
  
    /*     if (product.qtt > foundProduct.qtt_in_stock) {
          return res.status(403).json({ msg: "Not enough quantity in stock" });
        } */
  
        // Esse formato de objeto é o formato requerido pela API do Stripe
        line_items.push({
          price_data: {
            currency:"usd",
            product_data: {
              name: foundProduct.name,
              img: [foundProduct.img],
            },
            unit_amount: parseInt(foundProduct.price * 100),
          },
          quantity: product.qtt,
       
        });
      }
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [...line_items],
        mode: "payment",
        success_url: `${process.env.REACT_APP_URL}/order/success`,
        cancel_url: `${process.env.REACT_APP_URL}/order/canceled`,
      });
  
      return res.status(201).json({ id: session.id });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Failed to create checkout session." });
    }
  });

  // Criar uma nova transação (compra)
router.post(
  "/transaction",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      // Criar a transação
      const result = await orderModule.create(req.body);

      // Atualizar as transações deste usuário
      const updatedUser = await userModule.findOneAndUpdate(
        { _id: req.body.userid },
        { $push: { order: result._id } }
      );

      console.log(updatedUser);

      // Atualizar as transações de cada produto

      const productArr = [];

      for (let product of req.body.products) {
        const updatedProduct = await productModule.findOneAndUpdate(
          { _id: product.productId },
          // $inc é o operador de incremento: ele vai subtrair ou adicionar desse campo a quantidade informada
          {
            $push: { order: result._id },
            // Atualizar os estoques dos produtos
            $inc: { qtt_in_stock: -product.qtt },
          }
        );

        productArr.push(updatedProduct);
      }

      function renderProduct() {
        let str = ``;
        productArr.map((product) => {
          str += `<li><span>${product.name}</span><br /> <span>${product.price}</span></li>`;
        });

        return str;
      }
            // Enviar o email de confirmação de compra
            const emailResponse = await mailer(
              req.currentUser.email,
              "Your order confirmation",
              `<p>Your purchase was received. We\'re waiting for payment confirmation.</p>
              <h3>Beers you bought:</h3>
              <ul>
              ${renderProduct()}
              </ul>
              `
            );
      
            // Responde o resultado pro cliente
            return res.status(201).json({ result, emailResponse });
          } catch (err) {
            console.error(err);
            return res.status(500).json({ msg: JSON.stringify(err) });
          }
        }
      );



router.get("/userOrders",isAuthenticated,attachCurrentUser,async(req,res,next)=>{

    try{

        
const result = await orderModule.find({userid:req.currentUser._id}).populate("Product")

return res.status(200).json(result);

    }catch(err){next(err)}
})




router.get("/allOrders",isAuthenticated,attachCurrentUser,isAdmin,async(req,res,next)=>{

    try{

        
const result = await orderModule.find().populate("Product")

return res.status(200).json(result);

    }catch(err){next(err)}
})

router.delete("/deleteOrder/:id",isAuthenticated,attachCurrentUser,isAdmin,async(req,res,next)=>{

    try{

const resp = await orderModule.deleteOne({_id:req.params.id})

if(resp.n>0){
    return res.status(200).json({});
}
return res.status(404).json({ error: "Ordem não encontrado." });

    }catch(err){next(err)}

})


module.exports = router;
