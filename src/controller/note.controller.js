const noteService = require("../services/note.service");
const { successModel } = require("../utils/request-model");

class NoteController {
  // 添加文章
  async create(ctx) {
    await noteService.create(ctx.addPayload);
    ctx.body = successModel("添加文章成功！");
  }
  // 删除文章
  async remove(ctx) {
    await menuService.remove(fetchParamsId(ctx));
    ctx.body = successModel("删除菜单成功！");
  }
}

module.exports = new NoteController();
