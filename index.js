// Setup defaults
root = exports || this;
root.CollectionRevisions = {};

var CollectionRevisions = {
  field: 'history',
  lastModifiedField: 'lastModified',
  ignoreWithin: false,
  keep: true,
  debug: false,
  fields: [],
}

Meteor.Collection.prototype.attachCollectionFieldHistory = (opts){
  if (!opts) opts = {};

  _.defaults(opts, CollectionRevisions);

  let collection = this;

  collection.before.insert = (userId, doc){
    debug && console.log('before.insert FieldHistory', doc);
  }

  collection.before.update = (userId, doc, fieldNames, modifier, options){
    debug && console.log('before.update FieldHistory', doc, modifier);
  }

}