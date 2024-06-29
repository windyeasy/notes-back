const KoaRouter = require("@koa/router");
const { createAvatarFile, addFile, getFilesByIds } = require("../controller/file.controller");
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

// 通过文件ids获取文件信息
fileRouter.get("/files", verifyAuth,  getFilesByIds);

module.exports = fileRouter;
