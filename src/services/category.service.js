const {Category} = require("../models");

const add = async (category) => {
  const {uuid, name, description} = category;
  const newCategory = await Category.create({uuid, name, description});
  return newCategory;
};

const findOne = async (uuid) => {
  const category = await Category.findByPk(uuid);
  return category;
};

const list = async () => {
  const categories = await Category.findAll();
  return categories;
};

const update = async (uuid, category) => {
  const {name, description} = category;
  const updatedCategory = await Category.update(
    {name, description},
    {where: {uuid}}
  );
  return updatedCategory;
};

const deleteCategory = async (uuid) => {
  const deletedCategory = await Category.destroy({where: {uuid}});
  return deletedCategory;
};

module.exports = {add, list, update, deleteCategory, findOne};
