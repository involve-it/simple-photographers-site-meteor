/**
 * Created by aarutunyan on 4/15/15.
 */

Template.topMenu.helpers({
  emailLocalPart: function() {
    var email = Meteor.user().emails[0].address;
    return email.substring(0, email.indexOf('@'));
  },
  userMenuOpen: function() {
    return Session.get(USER_MENU_KEY);
  },
  showAuth: function(){
    return this.showAuth;
  },
  currentUser: function () {
    if(Meteor.userId())
      return Meteor.user().name || (Meteor.user().emails && Meteor.user().emails[0] && Meteor.user().emails[0].address);
  },
  currentUserId: function () {
    return Meteor.userId();
  },
  currentUserIsAdmin: function(){
    return app.helpers.isAdmin();
  }
});
Template.topMenu.events({
  'click .js-menu': function() {
    Session.set(MENU_KEY, ! Session.get(MENU_KEY));
  },
  'click .js-user-menu': function(event) {
    Session.set(USER_MENU_KEY, ! Session.get(USER_MENU_KEY));
    // stop the menu from closing
    event.stopImmediatePropagation();
  },
  'click #menu a': function() {
    Session.set(MENU_KEY, false);
  }
});
Template.topMenu.helpers({
  emailLocalPart: function() {
    var email = Meteor.user().emails[0].address;
    return email.substring(0, email.indexOf('@'));
  },
  userMenuOpen: function() {
    return Session.get(USER_MENU_KEY);
  },
  showAuth: function(){
    return true;
  },
  currentUser: function () {
    if(Meteor.userId())
    return Meteor.user().name || (Meteor.user().emails && Meteor.user().emails[0] && Meteor.user().emails[0].address);;
  },
  currentUserId: function () {
    return Meteor.userId();
  }
});
Template.topMenu.events({
  'click .js-menu': function() {
    Session.set(MENU_KEY, ! Session.get(MENU_KEY));
  },
  'click .js-user-menu': function(event) {
    Session.set(USER_MENU_KEY, ! Session.get(USER_MENU_KEY));
    // stop the menu from closing
    event.stopImmediatePropagation();
  },
  'click #menu a': function() {
    Session.set(MENU_KEY, false);
  }
});