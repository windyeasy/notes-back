const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const { create, remove } = require("../controller/note.controller");
const { verifyNoteAdd } = require("../middleware/note.middleware");

const noteRouter = new KoaRouter({
  prefix: "/note",
});
// 添加文章
noteRouter.post("/", verifyAuth, verifyNoteAdd, create);
// 删除文章
noteRouter.delete("/:id", verifyAuth, remove);
module.exports = noteRouter;
