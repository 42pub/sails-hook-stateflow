const path = require('path');

const buildDictionary = require('sails-build-dictionary');

module.exports = function initializeModel(sails, cb) {
  /**
   * Model
   */
  buildDictionary.optional({
    dirname: path.resolve(__dirname, '../api/models'),
    filter: /^([^.]+)\.(js|coffee|litcoffee)$/,
    replaceExpr: /^.*\//,
    flattenDirectories: true
  }, function (err, models) {
    if (err) {
      return cb(err);
    }
    // Get any supplemental files
    buildDictionary.optional({
      dirname: path.resolve(__dirname, '../api/models'),
      filter: /(.+)\.attributes.json$/,
      replaceExpr: /^.*\//,
      flattenDirectories: true
    }, function (err, supplements) {
      if (err)
        return cb(err);

      const finalModels = sails.util.merge(models, supplements);
      sails.models = sails.util.merge(sails.models || {}, finalModels);
    });
  });
};
