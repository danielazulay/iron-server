const router = require("express").Router();

const isAdmin = require("../middlewares/isAdmin")

const isAuthenticated = require("../middlewares/isAuthenticated");

const productModule = require("../models/Product.model")

router.post("/newProduct", isAuthenticated, async (req, res, next) => {
    try{
        const data = req.body;
        const response = await productModule.create({...data})

        return res.status(200).json(response)
    }catch(err){
        console.log(err);
        next(err);
    }
})

router.put("/editProduct/:id",isAuthenticated,isAdmin,async(req,res,next)=>{
try{

    const data= req.body
    const {id} = req.params

const resposta = await productModule.findByIdAndUpdate({_id:id},{...data},{ new: true })
return res.status(200).json(resposta)
}catch(err){
    next(err)
}

})

router.delete("/deleteProduct/:id",isAuthenticated,isAdmin,async(req,res,next)=>{

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

router.get("/search",isAuthenticated,async(req,res,next)=>{

    
    try{

const {name} = req.query
const {category} = req.query
       

      
        
if(category){
       let productCategory = await productModule.find( {category: category} )
       return res.status(200).json(productCategory); 

}
          let productname = await productModule.find({name:{$regex:name} } )
        
   
            return res.status(200).json(productname); 
       
        } catch (err) {
            next(err);
          } 
       
          
      
        
    });
module.exports = router;