const connection = require("../app/database");
const BaseService = require("./base.service");

class NoteService extends BaseService {}
const noteService = new NoteService("note");
module.exports = noteService;
