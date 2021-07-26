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