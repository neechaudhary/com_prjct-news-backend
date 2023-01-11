const express = require("express");
const router = express.Router();
const NewsSchema = require("../models/news_schema");

//Get all news
router.get("/", async (req, res) => {
  try {
    const news = await NewsSchema.find({
      is_published: true,
    }).lean();

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:name", async (req, res) => {
  const search = req.params.name;
  console.log(search);
  try {
    const news = await NewsSchema.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
        { articles: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "error.message", status: "error" });
  }
});

module.exports = router;
