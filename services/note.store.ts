import Datastore from 'nedb-promises';
import {Note} from "../models/note";

export class NoteStore {

  db: Datastore;

  constructor() {
    this.db = new Datastore({filename: './data/note.db', autoload: true});
  }

  public async getById(id: string) {
    return await this.db.findOne({_id: id});
  }

  public async insert(note: Note) {
    return await this.db.insert(note);
  }

  public async update(id: string, title: string, description: string, importance: number, dueDate: string, done: boolean) {
    await this.db.update({_id: id}, {$set: {title, description, importance, dueDate, done}});
  }

  public async deleteById(id: string) {
    await this.db.remove({_id: id}, {});
    return {};
  }

  public async getAll(showFinished: string, order: string, orderDir: string) {
    const orderParams = {};
    orderParams[order] = Number(orderDir);

    const where = showFinished ? {} : {'done': false};
    return {notes: await this.db.find(where).sort(orderParams)};
  }

}

export const noteStore = new NoteStore();
