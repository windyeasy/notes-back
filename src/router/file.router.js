const KoaRouter = require("@koa/router");
const { createAvatarFile, addFile } = require("../controller/file.controller");
const { verifyAuth } = require("../middleware/login.middleware");
const {
  avatarHandler,
  verifySingleFile,
  fileHandler,
} = require("../middleware/file.middleware");
const fileRouter = new KoaRouter({
  prefix: "/file",
});

// 上传头像
fileRouter.post(
  "/avatar",
  verifyAuth,
  avatarHandler,
  verifySingleFile("avatar"),
  createAvatarFile
);

// 上传文件
fileRouter.post(
  "/upload",
  verifyAuth,
  fileHandler,
  verifySingleFile("file"),
  addFile
);

module.exports = fileRouter;
