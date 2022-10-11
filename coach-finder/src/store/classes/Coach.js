import User from './User';

export default class Coach extends User {
  constructor(firstName, lastName, email, type, activities, description, rate) {
    super(firstName, lastName, email, type, activities);
    this.description = description;
    this.rate = rate;
  }
}
