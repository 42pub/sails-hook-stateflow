/**
 * Default model configuration
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 *
 * For more info on Sails models, see:
 * http://sailsjs.org/#!/documentation/concepts/ORM
 */

module.exports.models = {

    attributes: {
        //createdAt: { type: 'number', autoCreatedAt: true, },
        //updatedAt: { type: 'number', autoUpdatedAt: true, },
        //id: { type: 'number', autoIncrement: true, },
        //--------------------------------------------------------------------------
        //  /\   Using MongoDB?
        //  ||   Replace `id` above with this instead:
        //
        // ```
        //id: { type: 'integer'},
        id: { 
          type: 'number', 
          autoIncrement: true, 
       },
        // ```
        //
        // Plus, don't forget to configure MongoDB as your default datastore:
        // https://sailsjs.com/docs/tutorials/using-mongo-db
        //--------------------------------------------------------------------------
      },
    migrate: 'drop'

};
