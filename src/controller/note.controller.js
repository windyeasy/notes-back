const noteService = require("../services/note.service");
const { fetchLikeValue } = require("../utils/fetch-like-value");
const { fetchPageInfo } = require("../utils/fetch-page-info");
const fetchParamsId = require("../utils/fetch-params-id");
const { successModel } = require("../utils/request-model");

class NoteController {
  // 添加文章
  async create(ctx) {
    await noteService.create(ctx.payload);
    ctx.body = successModel("添加文章成功！");
  }
  // 更新文章
  async update(ctx) {
    await noteService.update(fetchParamsId(ctx), ctx.payload);
    ctx.body = successModel("更新文章成功！");
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
    const { title } = ctx.query;
    const result = await noteService.queryList(title, offset, size);
    const total = await noteService.fetchTotal(
      "WHERE title like ?",
      fetchLikeValue(title)
    );
    ctx.body = successModel({
      message: "列表获取成功！",
      data: {
        list: result,
        total,
      },
    });
  }
  /**
   *
   */
  // 网站查询笔记文章
  async queryNotes(ctx) {
    const { size, offset } = fetchPageInfo(ctx);
    const { title } = ctx.query;
    const result = await noteService.queryNotes(title, offset, size);
    const total = await noteService.fetchTotal(
      "WHERE title like ?",
      fetchLikeValue(title)
    );
    ctx.body = successModel({
      message: "列表获取成功！",
      data: {
        list: result,
        total,
      },
    });
  }
  // 查询文章信息
  async queryNoteInfo(ctx) {
    const data = await noteService.queryNoteInfo(fetchParamsId(ctx));
    if (data && data.id) {
      ctx.body = successModel({
        message: "文章查询成功",
        data: data,
      });
    } else {
      ctx.body = {
        code: -1102,
        message: "未查询到文章信息",
      };
    }
  }
}

module.exports = new NoteController();
