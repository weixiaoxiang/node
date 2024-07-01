const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secretKey = "魏晓翔是个好人";
// 创建路由
router.get("/", (req, res) => {
  res.send("你好");
  // res.redirect("/user/123");
});

// 登录
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "weixiaoxiang" && password === "wxx") {
    res.json({
      code: 200,
      msg: "登录成功",
      data: {
        // expiresIn设置过期时间180秒
        token: jwt.sign({ username: username, password: password }, secretKey, { expiresIn: 60 * 3 }),
      },
    });
  } else {
    res.json({
      code: 400,
      msg: "登录失败",
    });
  }
});
module.exports = router;
