const connection = require("../app/database");
const BaseService = require("./base.service");
const { fetchShowFilePath } = require("../utils/handler-path");
class FileService extends BaseService {
  /**
   * 处理上传文件逻辑，在控制器里面有多处使用，所以抽取这个方法
   * @param {any} ctx koa context 对象
   * @returns
   */
  async handlerUploadFile(ctx) {
    // 得到文件上传信息插入数据库
    const { filename, mimetype, size, originalname } = ctx.file;
    const userId = ctx.user.id;
    const result = await fileService.create({
      filename,
      mimetype,
      size,
      originalname,
      userId,
    });
    return result;
  }
  // 获取文件列表通过ids
  async handlerGetFileList(ids) {
    const baseUrl = fetchShowFilePath("uploads/");
    const result = []
    const statement = `Select 
      'id', f.id,
      'filename', f.filename,
      concat(?, f.filename) as url
      from ${this.tbName} f
      Where id=?
      order by f.createAt desc 
    `;
    for (const id of ids.split(',')){
      const [data] = await connection.query(statement, [baseUrl, id]);
      result.push(...data);
    }
   
    return result;
  }
}
const fileService = new FileService("file");
module.exports = fileService;
