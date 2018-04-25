const State = require('./State');

let states = [];

module.exports = {
    getAll: function () {
        return states;
    },
    add: function (id, state) {
        let f = true;
        for(let i in state) {
            if (state.hasOwnProperty(i))
                if (!state[i] instanceof State)
                     f = false;
        }
        if (!f)
            return false;
        states.push({id: id, states: state});
        return true;
    },
    get: function (id) {
        for (let i in states)
            if (states[i].id === id)
                return states[i].states;
        return null;
    },
    update: function(id, state) {
        let s = this.get(id);
        if (s === null)
            return null;
        const old = states.splice(states.indexOf(s), 1);
        states.push({id: id, states: state});
        return old;
    }
};
