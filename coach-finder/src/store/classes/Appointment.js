import { v4 as uuidv4 } from 'uuid';

export default class Appointment {
  constructor(coach, member, activity, date, duration) {
    this.id = uuidv4();
    this.coach = coach;
    this.member = member;
    this.activity = activity;
    this.date = date;
    this.duration = duration;
  }
}
