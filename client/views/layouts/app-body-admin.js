
var SHOW_CONNECTION_ISSUE_KEY = 'showConnectionIssue';
Session.setDefault(SHOW_CONNECTION_ISSUE_KEY, false);

var CONNECTION_ISSUE_TIMEOUT = 5000;

Meteor.startup(function () {
  // Only show the connection error box if it has been 5 seconds since
  // the app started
  setTimeout(function () {
    // Launch screen handle created in lib/router.js
    dataReadyHold.release();

    // Show the connection error box
    Session.set(SHOW_CONNECTION_ISSUE_KEY, true);
  }, CONNECTION_ISSUE_TIMEOUT);
});

Template.appBodyAdmin.rendered = function() {
  this.find('#content-container')._uihooks = {
    insertElement: function(node, next) {
      $(node)
        .hide()
        .insertBefore(next)
        .fadeIn(function () {
          if(listFadeInHold) {
            listFadeInHold.release();
          }
        });
    },
    removeElement: function(node) {
      $(node).fadeOut(function() {
        $(this).remove();
      });
    }
  };
};

Template.appBodyAdmin.helpers({
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
   /*lists: function() {
    return Lists.find();
  },*/
  galleryLists: function() {
    return GalleryLists.find();
  },
  connected: function() {
    if (Session.get(SHOW_CONNECTION_ISSUE_KEY)) {
      return Meteor.status().connected;
    } else {
      return true;
    }
  },
  currentUserId: function () {
    return Meteor.userId();
  },
  menuOpen: function() {
    return Session.get(MENU_KEY) && 'menu-open';
  }
});

Template.appBodyAdmin.events({
  'click .content-overlay': function(event) {
    Session.set(MENU_KEY, false);
    event.preventDefault();
  },

  'click .js-logout': function() {
    Meteor.logout();
    Router.go('/home');
    /*// if we are on a private list, we'll need to go to a public one
    var current = Router.current();
    if (current.route.name === 'listsShow' && current.data().userId) {
      Router.go('listsShow', Lists.findOne({userId: {$exists: false}}));
    }else if (current.route.name === 'galleriesShow' && current.data().userId) {
      Router.go('galleriesShow', GalleryLists.findOne({userId: {$exists: false}}));
    }*/
  },

  'click .js-new-list': function() {
    var list = {name: Lists.defaultName(), incompleteCount: 0};
    list._id = Lists.insert(list);

    Router.go('listsShow', list);
  },
  'click .js-new-gallery': function() {
    var list = {name: GalleryLists.defaultName(), incompleteCount: 0};
    list._id = GalleryLists.insert(list);

    Router.go('galleriesShow', list);
  }
});