"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
class State {
    constructor(opts, next, valid) {
        if (typeof opts === 'string') {
            this.name = opts;
            this.next = next;
            this.valid = valid;
        }
    }
    /** Add route for current state */
    addRoute(nextName) {
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
    removeRoute(nextName) {
        if (!nextName || typeof nextName !== 'string')
            return false;
        const ind = this.next.indexOf(nextName);
        if (ind < 0)
            return false;
        this.next.splice(ind, 1);
        return true;
    }
}
exports.State = State;
