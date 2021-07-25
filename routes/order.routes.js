const router = require("express").Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

const productModule = require("../models/Product.model");

const orderModule = require("../models/Order.model");
const isAdmin = require("../middlewares/isAdmin");

router.post(
  "/newOrder",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    // Extrair o id do projeto dos parâmetros de rota
    try {
      const result = await orderModule.create({
        userid: req.currentUser._id,
      });

      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/userOrders",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const result = await orderModule
        .find({ userid: req.currentUser._id })
        .populate("Product");

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/allOrders",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const result = await orderModule.find().populate("Product");

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/insertPorducts/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const result = await orderModule.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { ...req.body } },
        {new : true}
      );

      const productnew = await productModule.findOneAndUpdate(
        { _id: result.productid },
        { $push: { userid: req.currentUser._id }, $inc: { unity: -1 }},
        {new : true}
      );

      if (result) {
        return res.status(200).json(result);
      }

      return res.status(404).json({ error: "Projeto não encontrado." });
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/deleteOrder/:id", isAuthenticated,attachCurrentUser, async (req, res, next) => {
  try{

      const deleteOrder = await orderModule.deleteOne({ _id: req.params.id })

      if(deleteOrder.n > 0){
          return res.status(200).json({})
      }
      return res.status(404).json({ error: "Projeto não encontrado." });
  }catch(err){
    next(err)
  }
})

module.exports = router;
