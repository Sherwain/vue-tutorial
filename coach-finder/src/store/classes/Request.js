import { v4 as uuidv4 } from 'uuid';

export default class Request {
  constructor(
    body,
    recipientEmail,
    recipientId,
    requesterEmail,
    requesterId,
    status
  ) {
    this.id = uuidv4();
    this.body = body;
    this.recipientEmail = recipientEmail;
    this.recipientId = recipientId;
    this.requesterEmail = requesterEmail;
    this.requesterId = requesterId;
    this.status = status;
  }
}
