const express = require("express");
const app = express();
const db = require("./models");
const authRoutes = require("./routes/authRoutes");
const globalNewsRoutes = require("./routes/globalNewsRoutes");
const asiaNewsRouter = require("./routes/asiaNewsRoute");

require("dotenv").config();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/news", globalNewsRoutes);
app.use("/api/aisanews", asiaNewsRouter);

const PORT = process.env.MYSQL_PORT || 4000;

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
