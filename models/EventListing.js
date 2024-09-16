const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class EventListing extends Model {}

EventListing.init(
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
    event_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "event",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "event_listing",
    indexes: [
      {
        unique: true,
        fields: ["user_id", "event_id"],
      },
    ],
  }
);

module.exports = EventListing;
