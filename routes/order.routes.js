const router = require("express").Router();


const isAuthenticated = require("../middlewares/isAuthenticated");


const productModule = require("../models/Product.model")

const orderModule = require("../models/Order.model")

const userModule = require("../models/User.model")

router.post("/newOrder",isAuthenticated,async(req,res,next)=>{


    try{
        const data= req.body
        const {id} = req.params

        const resposta = await productModule.create({...data})

      
        


    

return res.status(200).json(resposta)

    }catch(err){
        next(err);
    }




})