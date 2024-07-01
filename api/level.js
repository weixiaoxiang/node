const express = require("express");
const path = require("path");
const uploadFile = require("../uploadFile");
const { expressjwt } = require("express-jwt");
const router = express.Router();
const secretKey = "魏晓翔是个好人";
// algorithms必须   .unless用来指定哪些接口不需要token验证
router.use(
  expressjwt({
    secret: secretKey,
    algorithms: ["HS256"],
  }).unless({
    path: [
      // /api/level/:x/:y/:z排除
      { url: /\/api\/level\/\d+\/\d+\/\d+/, methods: ["GET", "POST"] },
      // /api/level/:id排除
      { url: /\/api\/level\/\d+/, methods: ["PUT"] },
    ],
  })
);
// 创建路由
// get;
router.get("/level/:x/:y/:z", (req, res) => {
  const { x, y, z } = req.params;
  res.json({
    code: 200,
    data: `你好level:${x}-${y}-${z}`,
  });
});
// post
router.post("/level/:x/:y/:z", (req, res) => {
  const { x, y, z } = req.params;
  const { key } = req.query;
  res.send(`你好${key}-level:${x}-${y}-${z}`);
});
// delete
router.delete("/level/:id", (req, res) => {
  const { id } = req.params;
  res.send(`你好${id}`);
});

// post
router.post("/level", (req, res) => {
  const username = req.auth.username;
  const password = req.auth.password;
  const data = req.body;
  res.json({
    msg: "成功",
    data: data,
    username: username,
    password: password,
  });
});
// put
router.put("/level/:id", (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const { key } = req.query;
  res.json({
    code: 200,
    data: data, // body
    id: id, // params
    key: key, // query
  });
});

// 其中 'files' 是表单中文件字段的名称
router.post("/uploadFiles", uploadFile("files", true, 3), (req, res) => {
  // 文件信息在 req.file
  res.json({
    code: 200,
    msg: "文件上传成功！",
  });
});

// // 错误处理，必须放在所有路由的最后面
router.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token...");
  } else {
    next(err);
  }
});
module.exports = router;
