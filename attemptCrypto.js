require("dotenv").config();
const crypto = require("crypto");

// 加密密钥和初始化向量
const key = Buffer.from(process.env.AES_KEY, "hex"); // AES-256密钥长度为32字节
const iv = Buffer.from(process.env.AES_IV, "hex"); // AES的IV长度为16字节

// 加密函数
function encrypt(text) {
  let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
}

// 解密函数
function decrypt(text) {
  let iv = Buffer.from(text.iv, "hex");
  let encryptedText = Buffer.from(text.encryptedData, "hex");
  let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// 使用示例
const originalText = "Hello, 魏晓翔!";
const encrypted = encrypt(originalText);
console.log("Encrypted:", encrypted);
const decrypted = decrypt(encrypted);
console.log("Decrypted:", decrypted);
