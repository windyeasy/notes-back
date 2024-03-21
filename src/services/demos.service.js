const connection = require("../app/database");
const { fetchLikeValue } = require("../utils/fetch-like-value");
const { fetchShowFilePath } = require("../utils/handler-path");
const BaseService = require("./base.service");

class DemosSevice extends BaseService {
  /**
   * 查询文章管理列表
   */
  async queryList(title, offset = 0, size = 10) {
    const baseUrl = fetchShowFilePath("uploads/");
    const statement = `Select 
       d.id id,
       d.title title,
       d.description description,
       d.fileId fileId,
       d.createAt createAt,
       d.updateAt updateAt,
       concat(?, f.filename) as coverUrl,
       JSON_OBJECT(
        'id', f.id,
        'filename', f.filename,
        'url', concat(?, f.filename)
      ) as fileInfo
       from ${this.tbName} d
       LEFT JOIN file f ON d.fileId = f.id 
       Where d.title like ?
       order by d.createAt desc 
       LIMIT ? OFFSET ?
    `;
    const [result] = await connection.query(statement, [
      baseUrl,
      baseUrl,
      fetchLikeValue(title),
      size,
      offset,
    ]);
    return result;
  }
}
const noteService = new DemosSevice("demos");
module.exports = noteService;
