"use strict";
module.exports = function (sequelize, DataTypes) {
  var Employee = sequelize.define("Employee", {
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false },
    position: { type: DataTypes.STRING, allowNull: false },
    salery: { type: DataTypes.STRING, allowNull: false },
    residence: { type: DataTypes.STRING, allowNull: false },
    attendance: { type: DataTypes.STRING, allowNull: false },
  });
  return Employee;
};
