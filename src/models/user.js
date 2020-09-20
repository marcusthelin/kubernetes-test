const { DataTypes } = require('sequelize');
const { sequelize } = require('../');

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

module.exports = User;
