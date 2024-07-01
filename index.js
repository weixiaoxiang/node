// setImmediate(() => {
//   console.log("setImmediate");
// });
// setTimeout(() => {
//   console.log("setTimeout 0 s");
// }, 0);
const fs = require("fs");
const path = require("path");
const { readFile } = require("fs/promises");
const http = require("http");
const express = require("express");
const cors = require("cors");
async function logFile(params) {
  try {
    // const promise = fs.promises.readFile(path.join(__dirname, "test.js"), {
    //   encoding: "utf-8",
    // });
    // const contents = await promise;
    // console.log(contents);
    // const contents = fs.readFileSync(path.join(__dirname, "test.js"), { encoding: "utf-8" });
    // console.log(contents);
    // fs.readFile(path.resolve(__dirname, "test.js"), { encoding: "utf-8" }, (err, data) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    //   console.log(data);
    // });
    // fs.appendFileSync(path.join(__dirname, "aaa.js"), "var test = 100;\n\n\n");
    // const basename = path.basename(path.join(__dirname, "/test.js"));
    // console.log(basename);
    // fs.mkdirSync(path.resolve(__dirname, "./new/a"), { recursive: true });
    // const res = fs.writeFileSync("./new/test1.txt", "今天是个好日子!", { encoding: "utf-8" });
    // console.log(res, "创建··");
    // fs.rmdirSync(path.resolve(__dirname, "./new/"), { recursive: true });
    // const rmres = fs.rmSync(path.resolve(__dirname, "./new"), {
    //   recursive: true,
    // });
    // console.log(rmres, "删除··");
    // console.log(path.extname(path.resolve(__dirname, "./new/test1.txt")));
    // 创建web服务器
    // const server = http.createServer();
    // server.on("request", (req, res) => {
    //   res.setHeader("Content-Type", "text/plain;charset=utf-8");
    //   res.end("你好，欢迎你的到来! 欢迎访问我的网站!");
    // });
    // //启动服务器
    // server.listen("8080", () => {
    //   console.log("启动 at http://127.0.0.1:8080");
    // });
  } catch (error) {
    Error(error);
  }
}
logFile();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
// 引入路由
const baseRouter = require(path.resolve(__dirname, "./api/index.js"));
const levelRouter = require(path.resolve(__dirname, "./api/level.js"));

// 创建express服务器
const app = express();
app.use(jsonParser); // 解析json数据
app.use(urlencodedParser); // 解析表单数据
// 托管静态资源目录
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(baseRouter);
app.use("/api", levelRouter); // 使用路由,设置路由前缀
app.use(cors()); // 解决跨域

//  尝试加密解密
const attemptCrypto = require("./attemptCrypto");

// 调用app.listen()方法，启动成功后的回调，启动服务器
app.listen(8081, () => {
  console.log("启动 at http://127.0.0.1:8080");
});
