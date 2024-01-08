const connection = require("../app/database");
const { fetchLikeValue } = require("../utils/fetch-like-value");
const { fetchShowFilePath } = require("../utils/handler-path");
const BaseService = require("./base.service");

class NoteService extends BaseService {
  /**
   * 查询文章管理列表
   */
  async queryList(title, offset = 0, size = 10) {
    const baseUrl = fetchShowFilePath("uploads/");
    const statement = `Select 
       n.id id,
       n.title title,
       n.type type,
       n.state state,
       n.content content ,
       n.fileId fileId,
       n.userId userId,
       JSON_OBJECT(
        'id', u.id, 
        'name', u.username, 
        'nickname', u.nickname,
        'telephone', u.telephone,
        'email', u.email
        ) as userInfo,
        concat(?, f.filename) as contentFileUrl
       from ${this.tbName} n 
       LEFT JOIN user u ON n.userId = u.id 
       LEFT JOIN file f ON n.fileId = f.id 
       Where n.title like ?
       order by n.createAt desc 
       LIMIT ? OFFSET ?
    `;
    const [result] = await connection.query(statement, [
      baseUrl,
      fetchLikeValue(title),
      size,
      offset,
    ]);
    return result;
  }
  /**
   * 网站查询文章列表
   */
  async queryNotes(title, offset = 0, size = 10) {
    const baseUrl = fetchShowFilePath("uploads/");
    const statement = `Select 
       n.id id,
       n.title title,
       n.type type,
       n.state state,
       n.content content ,
       n.fileId fileId,
       n.userId userId,
       JSON_OBJECT(
        'id', u.id, 
        'name', u.username, 
        'nickname', u.nickname,
        'telephone', u.telephone,
        'email', u.email
        ) as userInfo,
        concat(?, f.filename) as contentFileUrl
       from ${this.tbName} n 
       LEFT JOIN user u ON n.userId = u.id 
       LEFT JOIN file f ON n.fileId = f.id 
       Where n.title like ? and n.state=1
       order by n.createAt desc 
       LIMIT ? OFFSET ?
    `;
    const [result] = await connection.query(statement, [
      baseUrl,
      fetchLikeValue(title),
      size,
      offset,
    ]);
    return result;
  }
}
const noteService = new NoteService("note");
module.exports = noteService;
