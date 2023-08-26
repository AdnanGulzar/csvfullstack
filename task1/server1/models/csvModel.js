
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./../utils/db');

const CsvData = sequelize.define('CsvData', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  contact: DataTypes.STRING
});

module.exports = CsvData;
