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
       n.createAt createAt,
       n.updateAt updateAt,
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
       n.createAt createAt,
       n.updateAt updateAt,
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
  // 后台查询笔记详情
  async queryNoteDetail(id) {
    const baseUrl = fetchShowFilePath("uploads/");
    const statement = `Select 
       n.id id,
       n.title title,
       n.type type,
       n.state state,
       n.content content ,
       n.fileId fileId,
       n.userId userId,
       n.createAt createAt,
       n.updateAt updateAt,
       JSON_OBJECT(
        'id', u.id, 
        'name', u.username, 
        'nickname', u.nickname,
        'telephone', u.telephone,
        'email', u.email
        ) as userInfo,
        concat(?, f.filename) as contentFileUrl,
        JSON_OBJECT(
          'id', f.id,
          'filename', f.filename,
          'url', concat(?, f.filename)
        ) as fileInfo
       from ${this.tbName} n 
       LEFT JOIN user u ON n.userId = u.id 
       LEFT JOIN file f ON n.fileId = f.id 
       Where n.id = ? 
       order by n.createAt desc 
    `;
    const [result] = await connection.query(statement, [baseUrl, baseUrl, id]);
    return result[0];
  }
  // 查询文章信息
  async queryNoteInfo(id) {
    const baseUrl = fetchShowFilePath("uploads/");
    const statement = `Select 
       n.id id,
       n.title title,
       n.type type,
       n.state state,
       n.content content ,
       n.fileId fileId,
       n.userId userId,
       n.createAt createAt,
       n.updateAt updateAt,
       JSON_OBJECT(
        'id', u.id, 
        'name', u.username, 
        'nickname', u.nickname,
        'telephone', u.telephone,
        'email', u.email
        ) as userInfo,
        f.filename filename,
        concat(?, f.filename) as contentFileUrl

       from ${this.tbName} n 
       LEFT JOIN user u ON n.userId = u.id 
       LEFT JOIN file f ON n.fileId = f.id 
       Where n.id = ? and n.state=1
       order by n.createAt desc 
    `;
    const [result] = await connection.query(statement, [baseUrl, id]);
    return result[0];
  }

  // 简历文章查询
  async fetchResume() {
    const statement = `Select 
        n.id id,
        n.title title,
        n.type type,
        n.content content,
        f.filename filename
        from ${this.tbName} n 
        LEFT JOIN file f ON n.fileId = f.id 
        Where n.title like '%简历%' or n.title like '%resume%'
        order by n.createAt desc 
    `;
    const [result] = await connection.query(statement, []);
    return result[0];
  }
}
const noteService = new NoteService("note");
module.exports = noteService;
