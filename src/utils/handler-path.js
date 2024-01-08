const { SERVER_HOST_PORT } = require("../config/server");

/**
 * 获取文件展示地址，通过路由地址和开启服务器地址获取文件展示地址
 * @param {string} routePath 路由地址
 * @returns {string} 返回文件展示地址
 */
function fetchShowFilePath(routePath) {
  return `${SERVER_HOST_PORT}/${routePath}`;
}
module.exports = {
  fetchShowFilePath,
};
