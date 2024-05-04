const {successHandler, errorHandler} = require("../utils/responseHandler");
const categoryService = require("../services/category.service");

const listCategory = async (req, res, next) => {
  try {
    const categories = await categoryService.list();
    return successHandler(res, "List of categories", categories);
  } catch (error) {
    next(error);
  }
};

const addCategory = async (req, res, next) => {
  try {
    const category = req.body;
    if (!category.name) throw new Error("Category name is required");
    const newCategory = await categoryService.add(category);
    return successHandler(res, "Category added", newCategory);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const {uuid} = req.params;
    const check = await categoryService.findOne(uuid);
    if (!check) return errorHandler(res, "Category not found", 404);

    const deletedCategory = await categoryService.deleteCategory(uuid);
    return successHandler(res, "Category deleted", deletedCategory);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const {uuid} = req.params;
    const category = req.body;

    if (!category.name) throw new Error("Category name is required");
    if (!category.description) category.description = "";

    const check = await categoryService.findOne(uuid);
    if (!check) return errorHandler(res, "Category not found", 404);

    await categoryService.update(uuid, category);
    return successHandler(res, "Category updated");
  } catch (error) {
    next(error);
  }
};

module.exports = {listCategory, addCategory, deleteCategory, updateCategory};
