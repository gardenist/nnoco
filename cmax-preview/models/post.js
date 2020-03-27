const { Model, DataTypes } = require('sequelize');

class Post extends Model {}

const columns = {
    id: {
        type: DataTypes.BIGINT(20),
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true
    },

    authorId: {
        type: DataTypes.BIGINT(20),
        allowNull: false
    },

    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
};

const options = {
    tableName: 'post',
    timestamps: false,
    underscored: true
};

module.exports = (sequelize) => {
    Post.init(columns, { sequelize, ...options});
    return Post;
}