import { v4 as uuidv4 } from 'uuid';

export default class User {
  constructor(firstName, lastName, email, type, activities) {
    this.id = uuidv4();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.type = type;
    this.activities = activities;
  }

  setFirstName(firstName) {
    this.firstName = firstName;
  }

  setLastName(lastName) {
    this.lastName = lastName;
  }

  setEmail(email) {
    this.email = email;
  }

  setType(type) {
    this.type = type;
  }

  setActivities(activities) {
    this.activities = activities;
  }

  addActivity(activity) {
    this.activities.add(activity);
  }

  removeActivity(activity) {
    this.activities.delete(activity);
  }
}
