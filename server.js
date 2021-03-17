const express = require("express");
const { fakeDataPosts } = require("./fakeData");
const posts = fakeDataPosts; //changeName
const verifyToken = require("./middleware/auth");

const app = express();
require("dotenv").config();

app.use(express.json());
const PORT = process.env.PORT || 4000;

app.get("/posts", verifyToken, (req, res) => {
  const postFilter = posts.filter((post) => post.userId === req.userId);

  res.json(postFilter);
});

app.listen(PORT, () => console.log("sever start at " + PORT));
