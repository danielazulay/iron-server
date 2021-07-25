const router = require("express").Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

const productModule = require("../models/Product.model");

const orderModule = require("../models/Order.model");

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
      const result = await orderModule.find({ userid: req.currentUser._id });

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
