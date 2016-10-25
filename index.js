// Setup defaults
root = exports || this;
root.CollectionFieldHistory = {};

var CollectionFieldHistory = {
  field: 'history',
  lastModifiedField: 'lastModified',
  debug: false,
  fields: [],
};


function attachCollectionFieldHistory(collection, opts) {
  if (!opts) opts = {};
  _.defaults(opts, CollectionFieldHistory);
  opts.fields.push(opts.lastModifiedField);
  collection.before.insert(function (userId, doc) {
    var history = {};
    doc[opts.lastModifiedField] = new Date();
    history = _.pick(doc, opts.fields);
    if (!_.isEmpty(_.omit(_.clone(history), [opts.lastModifiedField]))) {
      doc[opts.field] = [history];

      opts.debug && console.log('before.insert FieldHistory', history);
    }
  });
  collection.before.update(function (userId, doc, fieldNames, modifier, options) {
    var history = {};
    if (modifier.$set) {
      modifier.$set[opts.lastModifiedField] = new Date();
      history = _.pick(modifier.$set, opts.fields);
    }
    if (!_.isEmpty(_.omit(_.clone(history), [opts.lastModifiedField]))) {
      if (!modifier.$push) modifier.$push = {};
      modifier.$push[opts.field] = {$each: [history], $position: 0};
      opts.debug && console.log('before.update FieldHistory', doc, modifier, history);
    }
  });
}

Meteor.Collection.prototype.attachCollectionFieldHistory = function (opts) {
  attachCollectionFieldHistory(this, opts)
};

function getHistoryOfField(object, field, historyField) {
  historyField = historyField || CollectionFieldHistory.field;
  var history = object[historyField];
  return history.filter(item => item[field]);
}
exports.attachCollectionFieldHistory = attachCollectionFieldHistory;
exports.getHistoryOfField = getHistoryOfField;
