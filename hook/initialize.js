"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const afterHook_1 = require("./afterHook");
function ToInitialize(sails) {
    return function initialize(cb) {
        sails.after(['hook:orm:loaded'], () => {
            afterHook_1.default(sails);
        });
        return cb();
    };
}
exports.default = ToInitialize;
