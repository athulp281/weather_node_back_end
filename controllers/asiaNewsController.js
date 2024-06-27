const db = require("../models");
const asiaNews = db.asianews;
const fs = require("fs");
const path = require("path");

exports.createNews = async (req, res) => {
    const { newsTitle, description } = req.body;
    const newsImage = req.file ? req.file.path : null;

    try {
        const news = await asiaNews.create({
            newsTitle,
            description,
            newsImage,
        });
        console.log(news);
        res.status(201).json(news);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateNews = async (req, res) => {
    const { id } = req.params;
    const { newsTitle, description } = req.body;
    const newsImage = req.file ? req.file.path : null;
    try {
        const news = await asiaNews.findByPk(id);
        if (!news) {
            return res.status(404).json({ error: "News not found" });
        }
        news.newsTitle = newsTitle;
        news.description = description;
        if (newsImage) {
            // Delete the old image if it exists
            if (news.newsImage) {
                fs.unlinkSync(news.newsImage);
            }
            news.newsImage = newsImage;
        }

        await news.save();

        res.status(200).json(news);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteAsiaNews = async (req, res) => {
    const { id } = req.params;

    try {
        const news = await asiaNews.findByPk(id);
        if (!news) {
            return res.status(404).json({ error: "News not found" });
        }
        if (news.newsImage) {
            fs.unlinkSync(news.newsImage);
        }
        await news.destroy();

        res.status(200).json({ message: "News deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllAsiaNews = async (req, res) => {
    try {
        const news = await asiaNews.findAll();
        if (!news) {
            return res.status(401).json({ error: "News not found" });
        }

        res.status(201).json(news);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
