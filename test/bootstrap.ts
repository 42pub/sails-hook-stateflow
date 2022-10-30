/// <reference path="../types/global.ts" />

import 'mocha';
import * as _ from '@sailshq/lodash';
var Sails = require('./fixtures/v1.x-app/node_modules/sails').Sails;

let sails: any

before(function (done) {

  this.timeout(50000);
  require("./fixture/app-export");
  Sails().lift({},
      function (err: any, _sails: any) {
        if (err) return done(err);
        sails = _sails;
        return done();
      }
  );
});

after(function (done) {
  if (sails) {
    return sails.lower(function (err: any) {
      if (err) {
        done();
      }
      done();
    });
  }
  done();
});