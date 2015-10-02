Lists = new Meteor.Collection('lists');

// Calculate a default name for a list in the form of 'List A'
Lists.defaultName = function() {
  var nextLetter = 'A', nextName = 'Quickie Quiz ' + nextLetter;
  while (Lists.findOne({name: nextName})) {
    nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
    nextName = 'Quickie Quiz ' + nextLetter;
  }

  return nextName;
};

Todos = new Meteor.Collection('todos');
