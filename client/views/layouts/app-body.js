var MENU_KEY = 'menuOpen';
Session.setDefault(MENU_KEY, false);

var USER_MENU_KEY = 'userMenuOpen';
Session.setDefault(USER_MENU_KEY, false);

var SHOW_CONNECTION_ISSUE_KEY = 'showConnectionIssue';
Session.setDefault(SHOW_CONNECTION_ISSUE_KEY, false);

var CONNECTION_ISSUE_TIMEOUT = 5000;


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

  // Only show the connection error box if it has been 5 seconds since
  // the app started
  setTimeout(function () {
    // Launch screen handle created in lib/router.js
    dataReadyHold.release();

    // Show the connection error box
    Session.set(SHOW_CONNECTION_ISSUE_KEY, true);
  }, CONNECTION_ISSUE_TIMEOUT);
});

Template.appBody.rendered = function() {
  this.find('#container')._uihooks = {
    /*insertElement: function(node, next) {
      debugger;
      $(node)
        .hide()
        .insertBefore(next)
        .fadeIn(function () {
          //listFadeInHold.release();
        });
    },
    removeElement: function(node) {
      debugger;
      $(node).fadeOut(function() {
        $(this).remove();
      });
    }*/
  };
};

Template.appBody.helpers({
  // We use #each on an array of one item so that the "list" template is
  // removed and a new copy is added when changing lists, which is
  // important for animation purposes. #each looks at the _id property of it's
  // items to know when to insert a new item and when to update an old one.
  thisArray: function() {
    return [this];
  },
  cordova: function() {
    return Meteor.isCordova && 'cordova';
  },
  galleryLists: function() {
    return GalleryLists.find();
  },
  activeClass: function() {

    if (Router.current().path === '/' || Router.current().path === '/home') {
      return 'active';
    }
  },
  /*activeListClass: function() {
    var current = Router.current();

    if (current.route.name === 'galleriesShow' && current.params._id === this._id) {
      return 'active';
    }
    if (current.route.name === 'listsShow' && current.params._id === this._id) {
      return 'active';
    }
  },*/
  connected: function() {
    if (Session.get(SHOW_CONNECTION_ISSUE_KEY)) {
      return Meteor.status().connected;
    } else {
      return true;
    }
  },
  menuOpen: function() {
    return Session.get(MENU_KEY) && 'menu-open';
  }
});

Template.appBody.events({
  'click .content-overlay': function(event) {
    Session.set(MENU_KEY, false);
    event.preventDefault();
  },
  'click .js-logout': function() {
    Meteor.logout();
    // if we are on a private list, we'll need to go to a public one
    Router.go('/home');
  }
});

Template.registerHelper('currentUserIsAdmin', function(){
    return app.helpers.isAdmin();
});