const State = require('../../State');

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
  })
  new State({
    name: 'FINISHED',
    valid: require('../../lib/valid'),
    next: []
  })
];

let stateStart = states[0];

module.exports = {
  attributes: {
    id: {
      type: 'string',
      required: true,
      unique: true,
      autoIncrement: true
    },
    state: {
      type: 'string'
    },
    states: {
      type: 'array'
    },
    next: function (name) {
      if (!name) {
        if (this.state.next[0])
          name = this.state.next[0];
        else
          return false;
      }
      const stateFind = this.states.filter(s => s.name === name);
      if (!stateFind)
        return false;
      if (stateFind.length > 1)
        return false;
      const state = stateFind[0];
      if (!state.valid())
        return false;

      this.state = state;
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
        let f = false;
        for (let s in states)
          if (s.name === i) {
            f = true;
            break;
          }
        if (!f)
          return false;
      }

      this.states.push(state);
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

      this.states.slice(state, 1);
      return state;
    },
    getState: function () {
      return this.state.name;
    },
    getStates: function () {
      return this.states;
    }
  },
  beforeCreate: (values, cb) => {
    values.state = states[0].name;
    return cb();
  },
  afterCreate: (values, cb) => {
    values.states = states.concat(values.states);
    values.state = stateStart;
    return cb();
  },
  beforeUpdate: (values, cb) => {
    values.state = values.state.name;
    return cb();
  }
};
