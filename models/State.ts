export class State {
  /** StateName without  spaces */
  name: string;
  /** All states to possible to shift next */
  next: string[]
  /** valid */
  valid: void

  constructor(opts: string, next: string[], valid: void) {
    if (typeof opts === 'string') {
      this.name = opts;
      this.next = next;
      this.valid = valid;
    }
  }

  /** Add route for current state */
  addRoute(nextName: string) {
    if (!nextName || typeof nextName !== 'string')
      return false;
    if (nextName === 'CANCELED')
      return false;
    if (this.next.indexOf(nextName) >= 0)
      return false;

    this.next.push(nextName);
    return true;
  }

  /** remove route for current state */
  removeRoute(nextName: string) {
    if (!nextName || typeof nextName !== 'string')
      return false;
    const ind = this.next.indexOf(nextName);
    if (ind < 0)
      return false;

    this.next.splice(ind, 1);
    return true;
  }
}