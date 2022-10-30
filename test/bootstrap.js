"use strict";
/// <reference path="../types/global.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var Sails = require('./fixtures/v1.x-app/node_modules/sails').Sails;
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
