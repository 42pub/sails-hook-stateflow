"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../types/global.ts" />
process.env.PORT = "1336";
require("mocha");
var Sails = require('./fixture/node_modules/sails').Sails;
let sails;
before(function (done) {
    this.timeout(50000);
    require("./fixture/app-export");
    Sails().lift({}, function (err, _sails) {
        if (err)
            return done(err);
        sails = _sails;
        return done();
    });
});
after(function (done) {
    if (sails) {
        return sails.lower(function (err) {
            if (err) {
                done();
            }
            done();
        });
    }
    done();
});
