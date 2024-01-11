const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const {
  create,
  remove,
  list,
  update,
  queryNotes,
  queryNoteInfo,
} = require("../controller/note.controller");
const { verifyNote } = require("../middleware/note.middleware");

const noteRouter = new KoaRouter({
  prefix: "/note",
});
// 添加文章
noteRouter.post("/", verifyAuth, verifyNote, create);
// 删除文章
noteRouter.delete("/:id", verifyAuth, remove);
// 查询文章列表
noteRouter.get("/list", verifyAuth, list);
// 完整查询文章
noteRouter.get("/article/list", queryNotes);
// 查询完整文章详情
noteRouter.get("/article/detail/:id", queryNoteInfo);
// 更新文章
noteRouter.patch("/:id", verifyAuth, verifyNote, update);
module.exports = noteRouter;
