const demosSevice = require("../services/demos.service");
const { fetchLikeValue } = require("../utils/fetch-like-value");
const { fetchPageInfo } = require("../utils/fetch-page-info");
const fetchParamsId = require("../utils/fetch-params-id");
const { successModel } = require("../utils/request-model");

class DemosController {
  // 添加demo
  async create(ctx) {
    await demosSevice.create(ctx.payload);
    ctx.body = successModel("操作成功！");
  }
  // 更新demo
  async update(ctx) {
    await demosSevice.update(fetchParamsId(ctx), ctx.payload);
    ctx.body = successModel("操作成功！");
  }
  // 移除demo
  async remove(ctx) {
    await demosSevice.remove(fetchParamsId(ctx));
    ctx.body = successModel("操作成功！");
  }
  // 后台demos列表
  async list(ctx) {
    // 获取处理过的分页信息
    const { size, offset } = fetchPageInfo(ctx);
    const { title } = ctx.query;
    const result = await demosSevice.queryList(title, offset, size);
    const total = await demosSevice.fetchTotal(
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
  // 前端demos列表
  async fetchAllList(ctx) {
    const result = await demosSevice.queryAllList();
    ctx.body = successModel({
      message: "列表获取成功！",
      data: result,
    });
  }
  
}

module.exports = new DemosController();
