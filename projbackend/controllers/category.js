const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: "category unavailable",
      });
    }
    req.category = cate;
    console.log(res.category);
    next();
  });
};
exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "category already exists",
      });
    }
    res.json({ category });
  });
};
exports.getCategory = (req, res) => {
  return res.json(res.category);
};
exports.getAllCategories = (req, res) => {
  Category.find().exec((err, categ) => {
    if (err) {
      return res.status(400).json({
        error: "category unavailable",
      });
    }
    res.json({ categ });
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  console.log(category);
  category.name = req.body.name;
  category.save((err, updatedCateg) => {
    if (err) {
      return res.status(400).json({
        error: "unable to update category",
      });
    }

    res.json(updatedCateg);
  });
};

exports.deleteCategory = (req, res) => {
  const category = req.category;
  category.remove((err, categ) => {
    if (err) {
      return res.status(400).json({
        error: "unable to delete category",
      });
    }
    res.json({
      message: `${categ} has been deleted successfully`,
    });
  });
};
