import { v4 as uuidv4 } from 'uuid';

export default class Activity {
  constructor(name, category) {
    this.id = uuidv4();
    this.name = name;
    this.category = category;
  }
}
