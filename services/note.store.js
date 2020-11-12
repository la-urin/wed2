import Datastore from 'nedb-promises';

export class NoteStore {
  constructor(db) {
    this.db = db || new Datastore({filename: './data/note.db', autoload: true});
  }

  async getById(id) {
    return await this.db.findOne({_id: id});
  }

  async insert(note) {
    return await this.db.insert(note);
  }

  async update(id, title, description, importance, dueDate, done) {
    await this.db.update({_id: id}, {$set: {title, description, importance, dueDate, done}});
  }

  async deleteById(id) {
    await this.db.remove({_id: id});
    return {};
  }

  async getAll(showFinished, order, orderDir) {
    const orderParams = {};
    orderParams[order] = Number(orderDir);

    console.log('getAll: ', showFinished, order, orderDir);

    const where = showFinished ? {} : {'done': false};
    return {notes: await this.db.find(where).sort(orderParams)};
  }

}

export const noteStore = new NoteStore();
