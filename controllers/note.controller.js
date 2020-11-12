import {noteStore} from '../services/note.store.js';
import {Note} from "../models/note";
import {CookieHelper} from '../utils/cookiehelper.util'

const THEME = 'theme';
const ORDER = 'order';
const ORDER_DIR = 'orderDir';
const SHOW_FINISHED = 'showFinished';
const LIGHT = 'theme-light';
const DARK = 'theme-dark';

export class NoteController {

  new(req, res) {
    res.render('note/create', {theme: this.getTheme(req, res)});
  }

  async get(req, res) {
    let id = req.params.id
    if (id === '-1') {
      await noteStore.insert(new Note()).then(note => id = note._id);
    }
    console.log(id);
    res.render('note/detail', {theme: this.getTheme(req, res), ...await noteStore.getById(id)});
  }

  async update(req, res) {
    await noteStore.update(req.params.id, req.body.title, req.body.description, req.body.importance, req.body.dueDate, req.body.done);
    return this.getAll(req, res);
  }

  async insert(req, res) {
    const note = new Note(req.body.title, req.body.description, req.body.importance, req.body.dueDate, req.body.done);
    await noteStore.insert(note);
    return this.getAll(req, res);
  }

  async delete(req, res) {
    await noteStore.deleteById(req.params.id);
    return this.getAll(req, res);
  }

  async getAll(req, res) {
    const theme = this.getTheme(req, res);
    const showFinished = CookieHelper.getValue(req, res, SHOW_FINISHED, true);
    const order = CookieHelper.getValue(req, res, ORDER, 'title');
    const orderDir = CookieHelper.getValue(req, res, ORDER_DIR, 1);

    res.render('index', {
      theme: theme,
      nextTheme: theme === LIGHT ? DARK : LIGHT,
      showFinished: showFinished,
      ...await noteStore.getAll(showFinished, order, orderDir)
    });
  }
  
  getTheme(req, res) {
    return CookieHelper.getValue(req, res, THEME, LIGHT);
  }
}

export const noteController = new NoteController();
