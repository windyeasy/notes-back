const errorRequest = require("../error-request");
const { FIELD_NOT_NULL } = require("../error-request/error-type");
const { fetchId } = require("../utils/fetch-id");
async function verifyDemos(ctx, next) {
  const { title, fileId = null, description = "", link = "" } = ctx.request.body;
  if (!title) {
    errorRequest.throw(FIELD_NOT_NULL, ctx, "标题");
  }
  ctx.payload = {
    title,
    description,
    fileId: fetchId(fileId),
    link
  };
  await next();
}

module.exports = {
  verifyDemos,
};
