const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.User;

exports.register = async (req, res) => {
    const { email, password, adminkey, name } = req.body;
    const key = "adminkey@123";

    try {
        if (adminkey === key) {
            const user = await User.create({ email, password, name });
            res.status(201).json(user);
        } else {
            res.status(401).json({ error: "invalid admin key" });
        }
    } catch (error) {
        res.status(400).json({ error: error.errors });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        return res.status(200).json({ user: user, token, message: "success" });
        // res.json({ user: user, token: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
