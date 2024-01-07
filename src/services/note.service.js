const connection = require("../app/database");
const BaseService = require("./base.service");

class NoteService extends BaseService {
  async create(content) {
    const statement = "";
    connection.execute(statement, [content]);
  }
}
const noteService = new NoteService("note");
module.exports = noteService;
