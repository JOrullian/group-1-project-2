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
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    group_id: {
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
    indexes: [
      {
        unique: true,
        fields: ["user_id", "group_id"],
      },
    ],
  }
);

module.exports = GroupListing;
