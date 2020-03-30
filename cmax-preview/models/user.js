const { Model, DataTypes } = require('sequelize');

class User extends Model {}

const columns = {
    id: {
        type: DataTypes.BIGINT(20),
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true
    },

    username: {
        type: DataTypes.STRING(20),
        allowNull: false
    },

    pw: {
        type: DataTypes.STRING(70),
        allowNull: false
    },

    nickname: {
        type: DataTypes.STRING(20),
        allowNull: false
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
};

const options = {
    tableName: 'user',
    timestamps: false,
    underscored: true
};

module.exports = (sequelize) => {
    User.init(columns, { sequelize, ...options});
    return User;
}