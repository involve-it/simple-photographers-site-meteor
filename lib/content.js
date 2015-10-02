/**
 * Created by ashot on 5/6/15.
 */
ContentCollection = new Meteor.Collection('contentCollection');
if (Meteor.isClient) {
  Meteor.subscribe('ContentCollection');
}
if (Meteor.isServer) {
  Meteor.publish('ContentCollection', function () {
    return ContentCollection.find();
  });
}