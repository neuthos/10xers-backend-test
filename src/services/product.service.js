const {Op} = require("sequelize");
const {Product} = require("../models");

const createProduct = async (productData) => {
  const newProduct = await Product.create({...productData});
  return newProduct;
};

const getProductById = (productId) => {
  const product = Product.findOne({where: {uuid: productId}});
  return product;
};

const list = async (query = "", page = 1, limit = 10) => {
  let where = {};

  if (query) where.name = {[Op.iLike]: `%${query}%`};
  const offset = (page - 1) * limit;
  const products = await Product.findAndCountAll({
    where,
    offset,
    limit,
    attributes: ["uuid", "name", "price", "description", "seo_slug", "stock"],
  });

  const totalPages = Math.ceil(products.count / limit);

  return {
    products: products.rows,
    totalPages,
    currentPage: page,
  };
};

const updateProductById = async (productId, updatedProductData) => {
  const product = Product.findOne({where: {uuid: productId}});
  if (!product) throw new Error("Product not found");

  const updatedProduct = await Product.update(
    {
      ...updatedProductData,
    },
    {where: {uuid: productId}, returning: true}
  );

  return updatedProduct;
};

const deleteProductById = async (productId) => {
  await Product.destroy({where: {uuid: productId}});
  return true;
};

module.exports = {
  list,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
