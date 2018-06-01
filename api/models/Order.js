const State = require('../../models/State');
const StateContainer = require('../../models/StatesContainer');

let states = [
  new State({
    name: 'CREATED',
    valid: [require('../../lib/valid')],
    next: ['IN_PROGRESS']
  }),
  new State({
    name: 'IN_PROGRESS',
    valid: [require('../../lib/valid')],
    next: ['FINISHED']
  }),
  new State({
    name: 'FINISHED',
    valid: [require('../../lib/valid')],
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
      const that = this;
      return new Promise((resolve, reject) => {
        if (!name) {
          if (that[stateName].next[0])
            name = that[stateName].next[0];
          else
            reject();
        }
        const stateFind = that[statesName].filter(s => s !== undefined && s.name === name);
        if (!stateFind)
          reject();
        if (stateFind.length > 1)
          reject();
        const state = stateFind[0];
        if (state.valid !== undefined && state.valid.length > 0) {
          async.parallel(state.valid, function (err, result) {
            if (err) reject(err);
            sails.log.info('END');

            if (!result) reject();

            that[stateName] = state;
            sails.emit('stateNext', that);
            resolve();
          });
        }
      });
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
    removeState: function (stateName) {
      if (!stateName)
        return false;
      let exist = false;
      let state;
      for (let s in states)
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
    getStateObj: function () {
      return this[stateName];
    },
    getStates: function () {
      return this[statesName];
    },
    loadState: function () {
      this[statesName] = StateContainer.get(this.id);
      sails.log.info(this);
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
