const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
require("dotenv").config();

app.use(express.json());
const PORT = process.env.PORT || 4000;

const fakeDataUser = [
  {
    id: 1,
    userName: "khanh",
  },
  {
    id: 2,
    userName: "khanhnoi",
  },
];
const users = fakeDataUser; //changeName

app.get("/posts", (req, res) => {
  res.json({
    posts: "myPosts",
  });
});

app.post("/login", (req, res) => {
  const userName = req.body.userName;
  const userFind = users.find((user) => user.userName == userName);
  //   console.log(userFind);

  if (!userFind) {
    return res.sendStatus(401);
  }

  //create jwt

  const accessToken = jwt.sign(userFind, process.env.ACCESS_TOKEN_SECRET);
});

app.listen(PORT, () => console.log("sever start at " + PORT));
