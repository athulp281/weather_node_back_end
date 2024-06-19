const express = require("express");
const app = express();
const db = require("./models");
const authRoutes = require("./routes/authRoutes");
const globalNewsRoutes = require("./routes/globalNewsRoutes");

require("dotenv").config();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/news", globalNewsRoutes);

const PORT = process.env.PORT || 3000;

db.sequelize
    .sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });
