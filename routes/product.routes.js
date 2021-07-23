const router = require("express").Router();

const isAuthenticated = require("../middlewares/isAuthenticated");


const productModule = require("../models/Product.model")

router.post("/newProduct",isAuthenticated,async(req,res,next)=>{
    try{
        const data= req.body

const resposta = productModule.create({...data})

return res.status(200).json(resposta)

    }catch(err){
        next(err);
    }
})

module.exports = router;