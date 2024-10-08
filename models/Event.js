const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Event extends Model {}

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
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sportType: {
      type: DataTypes.STRING,
    },
    created_by: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    numberOfPlayers: {
      type: DataTypes.INTEGER,
    },
    participants: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: [],
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: false,
    modelName: "event",
  }
);

module.exports = Event;
