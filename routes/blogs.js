const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

router.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.render("blogs/index", { blogs });
});

router.get("/new", (req, res) => {
  res.render("blogs/new");
});

router.post("/", async (req, res) => {
  const { title, content, author } = req.body;
  const newBlog = new Blog({ title, content, author });
  await newBlog.save();
  req.flash("success_msg", "Blog post created successfully");
  res.redirect("/blogs");
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render("blogs/show", { blog });
});
module.exports = router;
