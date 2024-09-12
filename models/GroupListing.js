const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class GroupListing extends Model {}

GroupListing.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    groupId: {
      type: DataTypes.INTEGER,
      references: {
        model: "group",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "group_listing",
    // indexes: [
    //   {
    //     unique: true,
    //     fields: ["userId", "groupId"],
    //   },
    // ],
  }
);

module.exports = GroupListing;
