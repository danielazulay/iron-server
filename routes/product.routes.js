const router = require("express").Router();

const isAuthenticated = require("../middlewares/isAuthenticated");


const productModule = require("../models/Product.model")

router.post("/newProduct",isAuthenticated,async(req,res,next)=>{
    try{
        const data= req.body

const resposta = await productModule.create({...data})

return res.status(200).json(resposta)

    }catch(err){
        next(err);
    }
})

router.put("/editProduct/:id",isAuthenticated,async(req,res,next)=>{
try{

    const data= req.body
    const {id} = req.params

const resposta = await productModule.findByIdAndUpdate({_id:id},{...data},{ new: true })
return res.status(200).json(resposta)
}catch(err){
    next(err)
}

})

router.delete("/deleteProduct/:id",isAuthenticated,async(req,res,next)=>{

try{
    const {id} = req.params

const resposta = await productModule.findOneAndDelete({_id:id})

if(resposta.n<1){

 return res.status(404).json({ error: "produto nao existe" });
}

return res.status(200).json({})
} catch (err) {
    next(err);
  }
}
);
router.get("/getAllProducts",isAuthenticated,async(req,res,next)=>{
try{

    const data= req.body
    const resposta = await productModule.find()
    return res.status(200).json(resposta)
} catch (err) {
    next(err);
  }   

})
module.exports = router;