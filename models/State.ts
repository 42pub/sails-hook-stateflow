/** State instance */
export class State {
  /** StateName without  spaces */
  name: string;
  /** All states to possible to shift next */
  next: string[];
  /** valid */
  valid: void;

  constructor(name: string, next: string[], valid: void) {
    if (!name || !next || typeof valid !== "function") throw "arguments required";
    this.name = name;
    this.next = next;
    this.valid = valid;
  }

  /** Add route for current state */
  addRoute(nextName: string) {
    if (!nextName || typeof nextName !== "string") throw "nextName required";

    if (this.next.indexOf(nextName) >= 0) return false;

    this.next.push(nextName);
    return true;
  }

  /** Remove route for current state */
  removeRoute(nextName: string) {
    if (!nextName || typeof nextName !== "string") throw "nextName required";
    const ind = this.next.indexOf(nextName);
    if (ind < 0) return false;
    this.next.splice(ind, 1);
    return true;
  }
}
