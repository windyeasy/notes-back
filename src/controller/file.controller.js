const { UPLOAD_PATH } = require("../config/path");
const { SERVER_HOST_PORT } = require("../config/server");
const fileService = require("../services/file.service");
const { successModel } = require("../utils/request-model");
const fs = require("fs");
class FileController {
  // 头像上传
  async createAvatarFile(ctx) {
    // 得到文件上传信息插入数据库
    const result = await fileService.handlerUploadFile(ctx);
    const { filename } = ctx.file;
    ctx.body = successModel({
      message: "上传头像成功!",
      data: {
        id: result.insertId,
        path: `${SERVER_HOST_PORT}/pictures/${filename}`,
      },
    });
  }
  // 文件上传
  async addFile(ctx) {
    const { filename } = ctx.file;
    const result = await fileService.handlerUploadFile(ctx);
    ctx.body = successModel({
      message: "上传文件成功!",
      data: {
        id: result.insertId,
        path: `${SERVER_HOST_PORT}/uploads/${filename}`,
      },
    });
  }

  // 查看文件
  async showFile(ctx) {
    const { filename, mimetype } = ctx.fileInfo;
    // 读取文件
    try {
      const fileReadStream = fs.createReadStream(UPLOAD_PATH + "/" + filename);
      ctx.type = mimetype;
      ctx.body = fileReadStream;
    } catch (err) {
      console.log(err);
      ctx.body = "文件不存在，或者已经被删除请联系管理员";
    }
  }
}

module.exports = new FileController();
