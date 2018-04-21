const State = require('./State');

let states = [];

module.exports = {
    getAll: function () {
        return states;
    },
    add: function (id, state) {
        for(let i in state) {
            let f = true;
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
                return states[i];
        return null;
    }
};
