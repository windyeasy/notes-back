const KoaRouter = require("@koa/router");
const {
  verifyUser,
  passwordEncryption,
  verifyEditUser,
  verifyPasswordEdit,
} = require("../middleware/user.middleware");

const {
  create,
  update,
  remove,
  list,
  detail,
  queryUserInfo,
  modifyPassword,
} = require("../controller/user.controller");
const { verifyAuth } = require("../middleware/login.middleware");

const userRouter = new KoaRouter({
  prefix: "/user",
});
// 添加用户
userRouter.post("/", verifyUser, passwordEncryption, create);
// 删除用户
userRouter.delete("/:id", verifyAuth, remove);
// 编辑用户
userRouter.patch("/:id", verifyAuth, verifyEditUser, update);
// 用户密码编辑
userRouter.patch(
  "/modify-password/:id",
  verifyAuth,
  verifyPasswordEdit,
  passwordEncryption,
  modifyPassword
);
// 查询用户列表
userRouter.get("/", verifyAuth, list);
// 获取用户信息，通过token
userRouter.get("/info", verifyAuth, queryUserInfo);
// 获取用户详情
userRouter.get("/:id", verifyAuth, detail);

module.exports = userRouter;
