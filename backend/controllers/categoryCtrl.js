const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");
const Transaction = require("../model/Transaction");

const categoryController = {
  //Add
  create: asyncHandler(async (req, res) => {
    const { name, type } = req.body;
    if (!name || !type) {
      throw new Error("Name and Type are required for creating a category");
    }

    //Converting to LowerCase
    const normalizedName = name.toLowerCase();
    //Check if type is valid
    const validTypes = ["income", "expense"];
    if (!validTypes.includes(type.toLowerCase())) {
      throw new Error("Invalid Type " + type);
    }

    //Check if category already exists on the user
    const categoryExists = await Category.findOne({
      name: normalizedName,
      user: req.user,
    });

    if (categoryExists) {
      throw new Error(`${categoryExists.name} Category already exists`);
    }

    //Create Category
    const category = await Category.create({
      name: normalizedName,
      user: req.user,
      type: type.toLowerCase(),
    });
    res.status(201).json(category);
  }),

  //Lists
  lists: asyncHandler(async (req, res) => {
    const categories = await Category.find({ user: req.user });
    res.status(200).json(categories);
  }),

  //update
  update: asyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const { name } = req.body;
    if (!name) {
      throw new Error("Name is required for updating the category");
    }
    const normalizedName = name.toLowerCase();
    const category = await Category.findById(categoryId);
    if (!category && category.user.toString() !== req.user.toString()) {
      throw new Error("Category not found or User not Authorized");
    }
    const oldName = category.name;

    category.name = normalizedName || category.name;

    const updatedCategory = await category.save();

    //Update the affected Transactions
    if (oldName !== updatedCategory.name) {
      await Transaction.updateMany(
        { user: req.user, category: oldName },
        { $set: { category: updatedCategory.name } }
      );
    }
    res.json(updatedCategory);
  }),

  //delete
  delete: asyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (category && category.user.toString() === req.user.toString()) {
      //Updating transactions having this category
      const defaultCategory = "Uncategorized";

      await Transaction.updateMany(
        { user: req.user, category: category.name },
        {
          $set: { category: defaultCategory },
        }
      );
      await Category.findByIdAndDelete(categoryId);
      res.json({ message: "Category Removed and Transactions Updated" });
    } else {
      throw new Error("Category not found or User not Authorized");
    }
  }),
};

module.exports = categoryController;
