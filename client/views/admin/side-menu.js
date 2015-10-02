/**
 * Created by aarutunyan on 4/15/15.
 */
window.MENU_KEY = 'menuOpen';
Session.setDefault(MENU_KEY, false);

var USER_MENU_KEY = 'userMenuOpen';
Session.setDefault(USER_MENU_KEY, false);

Meteor.startup(function () {

// set up a swipe left / right handler
  $(document.body).touchwipe({
    wipeLeft: function () {
      Session.set(MENU_KEY, false);
    },
    wipeRight: function () {
      Session.set(MENU_KEY, true);
    },
    preventDefaultEvents: false
  });
});
Template.sideMenu.helpers({
  emailLocalPart: function() {
    var email = Meteor.user().emails[0].address;
    return email.substring(0, email.indexOf('@'));
  },
  galleryLists: function(a, b, c){
    return this.galleryLists;
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
  }
});
Template.sideMenu.events({
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
Template.sideMenuAdmin.helpers({
  emailLocalPart: function() {
    var email = Meteor.user().emails[0].address;
    return email.substring(0, email.indexOf('@'));
  },
  galleryLists: function(a, b, c){
    return this.galleryLists;
  },
  userMenuOpen: function() {
    return Session.get(USER_MENU_KEY);
  },
  activeHomeClass: function() {

    if (Router.current().path === '/' || Router.current().path === '/home') {
      return 'active';
    }
  },
  activeAdminPage: function(){
    var current = Router.current();

    if (current.route.name === 'admin') {
      return 'active';
    }
  },
  activeListClass: function() {
    var current = Router.current();

    if (current.route.name === 'galleriesShow' && current.params._id === this._id) {
      return 'active';
    }
    if (current.route.name === 'listsShow' && current.params._id === this._id) {
      return 'active';
    }
  },
  showAuth: function(){
    return true;
  },
  currentUser: function () {
    if(Meteor.user())
    return Meteor.user().name || (Meteor.user().emails && Meteor.user().emails[0] && Meteor.user().emails[0].address);;
  },
  currentUserId: function () {
    return Meteor.userId();
  }
});
Template.sideMenuAdmin.events({
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