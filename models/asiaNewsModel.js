module.exports = (sequelize, DataTypes) => {
    const AsiaNews = sequelize.define("AsiaNews", {
        newsTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        newsImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return AsiaNews;
};
