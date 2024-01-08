const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const { create, remove, list } = require("../controller/note.controller");
const { verifyNoteAdd } = require("../middleware/note.middleware");

const noteRouter = new KoaRouter({
  prefix: "/note",
});
// 添加文章
noteRouter.post("/", verifyAuth, verifyNoteAdd, create);
// 删除文章
noteRouter.delete("/:id", verifyAuth, remove);
// 查询文章列表
noteRouter.get("/list", verifyAuth, list);
module.exports = noteRouter;
