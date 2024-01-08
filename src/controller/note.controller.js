const noteService = require("../services/note.service");
const { fetchPageInfo } = require("../utils/fetch-page-info");
const { successModel } = require("../utils/request-model");

class NoteController {
  // 添加文章
  async create(ctx) {
    await noteService.create(ctx.addPayload);
    ctx.body = successModel("添加文章成功！");
  }
  // 删除文章
  async remove(ctx) {
    await noteService.remove(fetchParamsId(ctx));
    ctx.body = successModel("删除菜单成功！");
  }
  // 后台查询文章列表
  async list(ctx) {
    // 获取处理过的分页信息
    const { size, offset } = fetchPageInfo(ctx);
    const result = await noteService.queryList(offset, size);
    const total = await noteService.fetchTotal();
    ctx.body = successModel({
      message: "列表获取成功！",
      data: {
        list: result,
        total,
      },
    });
  }
}

module.exports = new NoteController();
