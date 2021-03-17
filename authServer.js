const express = require("express");
const jwt = require("jsonwebtoken");
const { fakeDataUsers } = require("./fakeData");
const verifyToken = require("./middleware/auth");
let users = fakeDataUsers; //changeName

const app = express();
require("dotenv").config();

app.use(express.json());
const PORT = process.env.PORT || 5000;

app.post("/login", (req, res) => {
  const userName = req.body.userName;
  const userFind = users.find((user) => user.userName === userName);
  //   console.log(userFind);
  if (!userFind) {
    return res.sendStatus(401);
  }
  //create jwt
  const userSign = { id: userFind.id, userName: userFind.userName };
  const accessToken = jwt.sign(userSign, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "60s",
  });

  const refreshToken = jwt.sign(userSign, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1h",
  });

  //updateRefreshToken
  users = users.map((user) => {
    if (user.userName === userName) {
      return { ...user, refreshToken: refreshToken };
    }
    return user;
  });

  console.log(users);

  res.json({ accessToken, refreshToken });
});

app.post("/token", (req, res) => {
  const refreshTokenReq = req.body.refreshToken;
  if (!refreshTokenReq) {
    return res.sendStatus(401);
  }
  console.log("users");
  console.log(users);
  const userFind = users.find((user) => user.refreshToken === refreshTokenReq);
  if (!userFind) {
    return res.sendStatus(403);
  }

  try {
    const decoded = jwt.verify(
      refreshTokenReq,
      process.env.REFRESH_TOKEN_SECRET
    );
    //create jwt
    const userSign = { id: userFind.id, userName: userFind.userName };
    const accessToken = jwt.sign(userSign, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "60s",
    });

    const refreshToken = jwt.sign(userSign, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    //updateRefreshToken
    users = users.map((user) => {
      if (user.userName === userSign.userName) {
        return { ...user, refreshToken: refreshToken };
      }
      return user;
    });
    console.log("users2");
    console.log(users);
    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
});

app.delete("/logout", verifyToken, (req, res) => {
  const userFind = users.find((u) => u.id === req.userId);
  //updateRefreshToken
  users = users.map((user) => {
    if (user.userName === userFind.userName) {
      return { ...user, refreshToken: null };
    }
    return user;
  });
  console.log("usersDelete");
  console.log(users);

  return res.json({ msg: "delete success !!" });
});

app.listen(PORT, () => console.log("authgSever start at " + PORT));
