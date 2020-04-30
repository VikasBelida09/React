const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      res.status(400).json({
        error: "user not found :( ",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getAllUsers = (req, res) => {
  User.find().exec((err, users) => {
    if (err || !users) {
      res.status(400).json({
        error: "user not found :( ",
      });
    }
    res.json(users);
  });
};

exports.getUser = (req, res) => {
  (req.profile.salt = undefined),
    (req.profile.encry_password = undefined),
    (req.profile.createdAt = undefined),
    (req.profile.updatedAt = undefined);
  return res.json(req.profile);
};

exports.getUpdatedUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          msg: "you are not Authorised to updated this :)",
        });
      }
      (user.salt = undefined),
        (user.encry_password = undefined),
        res.json(user);
    }
  );
};

exports.getOrders = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          msg: "no orders in this user account :(",
        });
      }
      return res.json(order);
    });
};

exports.pushOrdersinPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.orders.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.transaction_id,
    });
  });
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "unable to save purchase list",
        });
        next();
      }
    }
  ); //if there isnt any order it will create a new one!
};
