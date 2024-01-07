const errorRequest = require("../error-request");
const { FIELD_NOT_NULL } = require("../error-request/error-type");
const { fetchId } = require("../utils/fetch-id");

async function verifyNoteAdd(ctx, next) {
  const {
    title,
    type = 1,
    state = 1,
    content = "",
    fileId = null,
  } = ctx.request.body;
  if (!title) {
    return errorRequest.throw(FIELD_NOT_NULL, ctx, "标题");
  }
  ctx.addPayload = {
    title,
    type,
    state,
    content,
    fileId: fetchId(fileId),
    userId: ctx.user.id,
  };
  await next();
}
module.exports = { verifyNoteAdd };
