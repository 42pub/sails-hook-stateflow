"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const State = require("../models/State");
let stateStart = "INIT";
module.exports = function (config) {
    return {
        stateflowModelConfig: config,
        states: {},
        next: function (criteria, nextState) {
            let modelInstanceData = this.findOne(criteria);
            let stateField = this.stateflowModelConfig.stateField;
            return new Promise((resolve, reject) => {
                /** Если куда перемещатся не передано:
                 *  Проверяет если следующий роут всего один то перемещается на него,
                 *  Если следующего роута нету, то выдает ошибку
                 * */
                if (!name) {
                    // const state = sails.stateflow.filter((s) => s.name === modelInstanceData[stateField]);
                    // if (!state[0]) reject("current state invalid");
                    // else {
                    //   if (state[0].next[0]) name = state[0].next[0];
                    //   else reject("current state has no next state");
                    // }
                }
                const stateFind = sails.stateflow.filter((s) => s !== undefined && s.name === name);
                if (!stateFind)
                    reject("next state is invalid");
                if (stateFind.length > 1)
                    reject("there is more than 1 next state with same name");
                const state = stateFind[0];
                if (state.valid !== undefined) {
                    async.parallel([].concat(state.valid), function (err, result) {
                        if (err)
                            reject(err);
                        for (let i in result) {
                            i = result[i];
                            if (!i)
                                reject("validation fail");
                        }
                        modelInstanceData[stateField] = state.name;
                        sails.emit("stateNext", modelInstanceData);
                        modelInstanceData.save((err) => {
                            if (err)
                                reject(err);
                            resolve();
                        });
                    });
                }
                else {
                    reject("valid field is required");
                }
            });
        },
        getState: function (modelInstanceData) {
            return modelInstanceData[stateField];
        },
        getStateObj: function (modelInstanceData) {
            return sails.stateflow.filter((s) => s.name === modelInstanceData[stateField])[0];
        },
        /** Add state in current model */
        addState: function (modelInstanceData, state) {
            if (!state || !state instanceof State)
                return false;
            if (sails.stateflow.indexOf(state) >= 0)
                return false;
            if (!state.name || !state.next)
                return false;
            for (let i in state.next) {
                i = state.next[i];
                let f = false;
                for (let s in sails.stateflow) {
                    s = sails.stateflow[s];
                    if (s !== undefined && s.name === i) {
                        f = true;
                        break;
                    }
                }
                if (!f)
                    return false;
            }
            sails.stateflow.push(state);
            return true;
        },
        /** Remove state from current model */
        removeState: function (modelInstanceData, stateField) {
            if (!stateField)
                return false;
            let exist = false;
            let state;
            for (let s in sails.stateflow) {
                s = sails.stateflow[s];
                if (s.name === stateField) {
                    exist = true;
                    state = s;
                    break;
                }
            }
            if (!exist)
                return false;
            sails.stateflow.splice(sails.stateflow.indexOf(state), 1);
            return state;
        }
    };
};
