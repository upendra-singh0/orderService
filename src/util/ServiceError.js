export default class ServiceError extends Error {
  constructor({ message, status }) {
    super(message);
    this.status = status;
  }
}
