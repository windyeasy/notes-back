const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const { verifyDemos } = require("../middleware/demos.middleware");
const { create, update, remove, list, fetchAllList } = require("../controller/demos.controller");
const demosRouter = new KoaRouter({
  prefix: "/demos",
});

// 添加demo
demosRouter.post("/", verifyAuth, verifyDemos, create);

// 更新demo
demosRouter.patch("/", verifyAuth, verifyDemos, update)

// 移除demo
demosRouter.delete("/:id", verifyAuth, remove);

// 查询demos
demosRouter.get("/", verifyAuth, list);

// 前端查询demos列表
demosRouter.get("/queryDemos", fetchAllList)

module.exports = demosRouter;
