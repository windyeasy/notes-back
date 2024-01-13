const fs = require("fs");
const { UPLOAD_PATH } = require("../config/path");

/**
 * 读取uploads里面的文件
 * @param {string} filename
 * @returns 返回文件二进制
 */
function readUploadFile(filename) {
  const fileReadStream = fs.createReadStream(UPLOAD_PATH + "/" + filename);
  return fileReadStream;
}

// 通过p获取数据
function fetchReadStreamData(readStream) {
  return new Promise((resolve) => {
    readStream.on("data", (data) => {
      resolve(data);
    });
  });
}

module.exports = {
  readUploadFile,
  fetchReadStreamData,
};
