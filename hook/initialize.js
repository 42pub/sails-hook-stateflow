"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const afterHook_1 = require("./afterHook");
function ToInitialize(sails) {
    return function initialize(cb) {
        // TODO: Добавть в конфиг очередь загрузки
        //sails.after(['hook:services:loaded'], () => {
        afterHook_1.default(sails);
        //});
        return cb();
    };
}
exports.default = ToInitialize;
