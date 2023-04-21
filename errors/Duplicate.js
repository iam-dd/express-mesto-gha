module.exports = class Duplicate extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
};
