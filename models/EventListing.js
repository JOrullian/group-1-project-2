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
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    eventId: {
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
    // indexes: [
    //   {
    //     unique: true,
    //     fields: ["userId", "eventId"],
    //   },
    // ],
  }
);

module.exports = EventListing;
