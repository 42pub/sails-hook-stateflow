class State {
  constructor(opts, next, valid) {
    if (typeof opts === 'string') {
      this.name = opts;
      this.next = next;
      this.valid = valid;
    } else {
      this.name = opts.name;
      this.next = opts.next;
      this.valid = opts.valid;
    }
  }

  addNext(nextName) {
    if (!nextName || typeof nextName !== 'string')
      return false;
    if (nextName === 'CANCELED')
      return false;
    if (this.next.indexOf(nextName) >= 0)
      return false;

    this.next.push(nextName);
    return true;
  }

  removeNext(nextName) {
    if (!nextName || typeof nextName !== 'string')
      return false;
    if (this.next.indexOf(nextName) < 0)
      return false;

    this.next.slice(nextName, 1);
    return true;
  }
}

module.exports = State;
