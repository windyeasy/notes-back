const errorRequest = require("../error-request");
const { FIELD_NOT_NULL } = require("../error-request/error-type");
const { fetchId } = require("../utils/fetch-id");
/**
 * 校验文章添加中间件
 */
async function verifyNote(ctx, next) {
  const {
    title,
    type = 1,
    state = 1,
    content = "",
    fileId = null,
  } = ctx.request.body;
  if (!title) {
    return errorRequest.throw(FIELD_NOT_NULL, ctx, "文章标题");
  }
  ctx.payload = {
    title,
    type,
    state,
    content,
    fileId: fetchId(fileId),
    userId: ctx.user.id,
  };
  await next();
}
/**
 * 文章
 */

module.exports = { verifyNote };
