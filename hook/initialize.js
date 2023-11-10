"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const afterHook_1 = require("./afterHook");
function ToInitialize(sails) {
    return function initialize(cb) {
        if (sails.config.stateflow && sails.config.stateflow.runOnlyByEvent === true) {
            sails.once('stateflow:runHook', () => {
                afterHook_1.default(sails);
            });
        }
        else {
            // TODO: Добавть в конфиг очередь загрузки
            sails.after(['hook:http:loaded'], () => {
                afterHook_1.default(sails);
            });
        }
        return cb();
    };
}
exports.default = ToInitialize;
