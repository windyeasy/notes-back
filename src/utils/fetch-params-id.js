function fetchParamsId(ctx) {
  return ctx.params.id ?? -1;
}
module.exports = fetchParamsId;
