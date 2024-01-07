const KoaRouter = require("@koa/router");
const { showFile } = require("../controller/file.controller");
const { verifyFileIsExists } = require("../middleware/file.middleware");

const showFileRouter = new KoaRouter({
  prefix: "/",
});
// 查看图片
showFileRouter.get("pictures/:filename", verifyFileIsExists, showFile);
// 查看文件
showFileRouter.get("uploads/:filename", verifyFileIsExists, showFile);
module.exports = showFileRouter;
