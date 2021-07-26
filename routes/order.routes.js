const router = require("express").Router();


const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser")

const productModule = require("../models/Product.model")

const orderModule = require("../models/Order.model")
const isAdmin = require("../middlewares/isAdmin")


router.post("/newOrder",isAuthenticated,attachCurrentUser,async(req,res,next)=>{


  
        // Extrair o id do projeto dos parâmetros de rota
        try {
            const result = await orderModule.create({
              
                ...req.body
            });
 
req.body.products.forEach(async(item)=>{
   
    const productItem = await productModule.findOneAndUpdate({_id:item.productId},{$inc:{unity:-item.qtt}},{new:true})
    const update = await orderModule.findOneAndUpdate({_id:item.productId},{$inc:{value:productItem.price}},{new:true})
    console.log("productItem--->",productItem)

    console.log("item--->",item)
    console.log("update--->",update)
})
 
 
 
      
            return res.status(200).json(result);
          } catch (err) {
            next(err);
          }


})


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






router.delete("/deleteOrder/:id",isAuthenticated,attachCurrentUser,async(req,res,next)=>{

    try{

const resp = await orderModule.deleteOne({_id:req.params.id})

if(resp.n>0){
    return res.status(200).json({});
}
return res.status(404).json({ error: "Ordem não encontrado." });

    }catch(err){next(err)}

})


module.exports = router;