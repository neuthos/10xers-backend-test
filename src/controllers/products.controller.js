const {successHandler, errorHandler} = require("../utils/responseHandler");
const productService = require("../services/product.service");

const createProduct = async (req, res, next) => {
  try {
    // There should be a better way, but for MVP first we can use this first
    const requiredFields = ["name", "price", "stock", "category_id"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return errorHandler(res, `${field} is required`);
      }
    }

    const newProduct = await productService.createProduct(req.body);

    return successHandler(res, "Product created", newProduct);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await productService.getProductById(productId);
    if (!product) return errorHandler(res, "Product not found");

    return successHandler(res, "Product found", product);
  } catch (error) {
    next(error);
  }
};

const listProducts = async (req, res, next) => {
  try {
    const {query, page, limit} = req.query;
    const productList = await productService.list(query, page, limit);
    return successHandler(res, "List of products", productList);
  } catch (error) {
    next(error);
  }
};

const updateProductById = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await productService.getProductById(productId);
    if (!product) return errorHandler(res, "Product not found", 404);

    // There should be a better way, but for MVP first we can use this first
    const requiredFields = ["name", "price", "stock", "category_id"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return errorHandler(res, `${field} is required`);
      }
    }

    const updatedProduct = await productService.updateProductById(
      productId,
      req.body
    );
    return successHandler(res, "Product updated", updatedProduct);
  } catch (error) {
    next(error);
  }
};

const deleteProductById = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await productService.getProductById(productId);
    if (!product) return errorHandler(res, "Product not found", 404);

    await productService.deleteProductById(productId);
    return successHandler(res, "Product deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProductById,
  listProducts,
  updateProductById,
  deleteProductById,
};
