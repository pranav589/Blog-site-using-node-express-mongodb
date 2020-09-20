//importing express
const express = require("express");

//importing mongoose
const mongoose = require("mongoose");

//invoke express
const app = express();

//dotenv
require("dotenv").config();

//console.log(process.env)

const methodOverride = require("method-override");

const Article = require("./models/article");

const mongoDB_URI = process.env.MONGO_URI;

mongoose
  .connect(mongoDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then((result) => app.listen(8080))
  .catch((err) => console.log(err));

mongoose.connection.on("connected", () => {
  console.log("mongoose connected");
});
const articleRouter = require("./routes/articles");

//setting the ejs view engine
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

//respondng to the / request
app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});
app.use("/articles", articleRouter);
