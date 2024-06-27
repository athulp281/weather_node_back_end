const express = require("express");
const router = express.Router();
const asiaNewsController = require("../controllers/asiaNewsController");
const upload = require("../middleware/uploadMiddleware");

router.post(
    "/create-asia-news",
    // verifyToken,
    upload.single("newsImage"),
    asiaNewsController.createNews
);

router.put(
    "/update-asia-news/:id",
    upload.single("newsImage"),
    asiaNewsController.updateNews
);
router.get("/get-all-asia-news", asiaNewsController.getAllAsiaNews);
router.delete("/delete-asia-news/:id", asiaNewsController.deleteAsiaNews);
module.exports = router;
