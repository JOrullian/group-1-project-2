const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Event extends Model { }

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    location: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      // allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      // allowNull: false,
    },
    time: {
      // Change STRING data type to DATE
      type: DataTypes.DATE,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    participants: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      // allowNull: false,
      defaultValue: [],
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "event",
  }
);

module.exports = Event;
