"use strict";
module.exports = function (sequelize, DataTypes) {
  var Company = sequelize.define("Company", {
    name: { type: DataTypes.STRING, allowNull: false },
    tagLine: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    logo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isUrl: { msg: "Invalid URL" } },
    },
  });
  return Company;
};
