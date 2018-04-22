const State = require('../../State');
const StateContainer = require('../../StatesContainer');

let states = [
    new State({
        name: 'CREATED',
        valid: require('../../lib/valid'),
        next: ['IN_PROGRESS']
    }),
    new State({
        name: 'IN_PROGRESS',
        valid: require('../../lib/valid'),
        next: ['FINISHED']
    }),
    new State({
        name: 'FINISHED',
        valid: require('../../lib/valid'),
        next: []
    })
];

let stateStart = states[0];
const stateName = sails.config.stateflow.stateField;
const statesName = stateName + '_list';

// noinspection JSUnusedGlobalSymbols
module.exports = {
    attributes: {
        next: function (name) {
            if (!name) {
                if (this[stateName].next[0])
                    name = this[stateName].next[0];
                else
                    return false;
            }
            const stateFind = this[statesName].filter(s => s !== undefined && s.name === name);
            if (!stateFind)
                return false;
            if (stateFind.length > 1)
                return false;
            const state = stateFind[0];
            if (state.valid !== undefined)
                if (!state.valid())
                    return false;

            this[stateName] = state;
            return true;
        },
        addState: function (state) {
            if (!state || !state instanceof State)
                return false;
            if (states.indexOf(state) >= 0)
                return false;
            if (!state.name || !state.next)
                return false;
            for (let i in state.next) {
                i = state.next[i];
                let f = false;
                for (let s in states) {
                    s = states[s];
                    if (s !== undefined && s.name === i) {
                        f = true;
                        break;
                    }
                }
                if (!f)
                    return false;
            }

            this[statesName].push(state);
            StateContainer.update(this.id, this[statesName]);
            return true;
        },
        removeState: function(stateName) {
            if (!stateName)
                return false;
            let exist = false;
            let state;
            for(let s in states)
                if (s.name === stateName) {
                    exist = true;
                    state = s;
                    break;
                }
            if (!exist)
                return false;

            this[statesName].splice(this[statesName].indexOf(state), 1);
            StateContainer.update(this.id, this[statesName]);
            return state;
        },
        getState: function () {
            return this[stateName].name;
        },
        getStates: function () {
            return this[statesName];
        },
        loadState: function () {
            this[statesName] = StateContainer.get(values.id);
            this[stateName] = this[statesName].filter(s => s.name === this[stateName])[0];
        }
    },
    beforeCreate: (values, cb) => {
        values[stateName] = states[0].name;
        return cb();
    },
    afterCreate: (values, cb) => {
        values[statesName] = states;
        values[stateName] = stateStart;
        StateContainer.add(values.id, stateStart);
        return cb();
    },
    afterUpdate: (values, cb) => {
        values[statesName] = StateContainer.get(values.id);
        return cb();
    }
};
