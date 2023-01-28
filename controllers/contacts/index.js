const nullQuery = require("./nullQuery");
const getAll = require("./getAll");
const getById = require("./getById");
const add = require("./add");
const updateById = require("./updateById");
const removeById = require("./removeById");
const updateFavorite = require("./updateFavorite");

module.exports = {
  getAll,
  getById,
  nullQuery,
  add,
  updateById,
  removeById,
  updateFavorite,
};
