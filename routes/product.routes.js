const router = require("express").Router();

const attachCurrentUser = require("../middlewares/attachCurrentUser");
const isAdmin = require("../middlewares/isAdmin");

const isAuthenticated = require("../middlewares/isAuthenticated");

const productModule = require("../models/Product.model");

const uploader = require('../config/cloudinary.config')

router.post("/newProduct", isAuthenticated, attachCurrentUser, isAdmin, async (req, res, next) => {
    try {
      const data = req.body;

      const resposta = await productModule.create({
        userid: req.currentUser._id,
        ...data,
      });

      return res.status(200).json(resposta);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/editProduct/:id",
  isAuthenticated,
  attachCurrentUser,
  isAdmin,
  async (req, res, next) => {
    try {
      const data = req.body;
      const { id } = req.params;

      const resposta = await productModule.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          ...data,
        },
        { new: true }
      );
      return res.status(200).json(resposta);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/productDetails/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await productModule.findOne({ _id: id });
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

router.delete(
  "/deleteProduct/:id",
  isAuthenticated,
  attachCurrentUser,
  isAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const resposta = await productModule.deleteOne({ _id: id });

      if (resposta.n === 0) {
        return res.status(404).json({ msg: "Product not found." });
      }
    } catch (err) {
      next(err);
    }
  }
);

router.get("/getAllProducts", async (req, res, next) => {
  try {
    const data = req.body;
    const resposta = await productModule.find();
    return res.status(200).json(resposta);
  } catch (err) {
    next(err);
  }
});
// , $options: 'i' solve the problem with the regex can find even the second nasmes
router.get("/search", async (req, res, next) => {
  try {
    const { name } = req.query;
console.log("Sou name --> ",name)
    let productname = await productModule.find({
      name: {
        $regex: name.toLowerCase() , $options: 'i'
      },
    });

    return res.status(200).json(productname);
  } catch (err) {
    next(err);
  }
});


router.post('/upload',uploader.single('img'),isAuthenticated,attachCurrentUser,isAdmin,async(req,res,next)=>{
if(!req.file){
    return res.status(500).json({erro:'nao foi possivel completar o upload'})
}

return res.status(201).json({url:req.file.path})

})


module.exports = router;
