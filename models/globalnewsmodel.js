module.exports = (sequelize, DataTypes) => {
    const GlobalNews = sequelize.define("GlobalNews", {
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
            allowNull: true, // allow null initially since it's not required for text news
        },
    });

    return GlobalNews;
};
