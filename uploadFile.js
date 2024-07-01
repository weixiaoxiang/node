const path = require("path");
const fs = require("fs");
const multer = require("multer"); // 导入multer中间件，处理formdata媒体数据，通常用于文件上传

// 判断是否存在uploads文件夹，不存在则创建该文件夹
const dirs = [
  path.join(__dirname, "./public/uploads/pdf"),
  path.join(__dirname, "./public/uploads/photo"),
  path.join(__dirname, "./public/uploads/video"),
];
dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {
      recursive: true,
    });
  }
});
// 设置multer存储配置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLocaleLowerCase().trim().replace(".", "");
    if (ext === "pdf") cb(null, "public/uploads/pdf");
    if (ext === "png" || ext === "jpg" || ext === "jpeg") cb(null, "public/uploads/photo");
    if (ext === "mp4" || ext === "avi" || ext === "mov") cb(null, "public/uploads/video");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});
// 使用配置
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // 限制文件大小10MB
  },
  // 限制哪些上传，哪些不允许上传
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});
// 设置上传文件中间件
module.exports = function uploadFile(key, multi, multiNum) {
  if (multi) {
    return upload.array(key, multiNum);
  } else {
    return upload.single(key);
  }
};
