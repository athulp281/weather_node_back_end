const db = require("../models");
const globalNews = db.globalnews;
const fs = require("fs");
const path = require("path");

exports.createNews = async (req, res) => {
    const { newsTitle, description } = req.body;
    const newsImage = req.file ? req.file.path : null;

    try {
        const news = await globalNews.create({
            newsTitle,
            description,
            newsImage,
        });
        res.status(201).json(news);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllNews = async (req, res) => {
    try {
        const news = await globalNews.findAll();
        res.status(200).json(news);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getNewsById = async (req, res) => {
    const { id } = req.params;

    try {
        const news = await globalNews.findByPk(id);
        if (!news) {
            return res.status(404).json({ error: "News not found" });
        }
        res.status(200).json(news);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateNews = async (req, res) => {
    const { id } = req.params;
    const { newsTitle, description } = req.body;
    const newsImage = req.file ? req.file.path : null;

    try {
        const news = await globalNews.findByPk(id);
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

exports.deleteNews = async (req, res) => {
    const { id } = req.params;

    try {
        const news = await globalNews.findByPk(id);
        if (!news) {
            return res.status(404).json({ error: "News not found" });
        }

        // Delete the image file if it exists
        if (news.newsImage) {
            fs.unlinkSync(news.newsImage);
        }

        await news.destroy();

        res.status(200).json({ message: "News deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
