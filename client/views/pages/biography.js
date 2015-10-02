var ERRORS_KEY = 'homeErrors';
Template.biography.created = function() {
  Session.set(ERRORS_KEY, {});
};
Template.biography.rendered = function(){
  var cont = ContentCollection.findOne({key: 'biographyPage'}) && ContentCollection.findOne({key: 'biographyPage'}).value || '';
  this.$('#biography-content').html(cont);
}

Template.biography.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  },
  homePhoto: function(){
    var img = imgFiles.findOne({isHome: true});
    return '/' + img.path + '/' + img.name;
  },
  galleries: function(){
    return GalleryLists.find({userId: {$exists: false} ,$where: function() {
    //return GalleryLists.find({name: {$ne: 'Home Gallery'}, $where: function() {
      //debugger;
      var that = this;
      return imgFiles.find({galleries: {$exists: true}, $where: function() {
          //debugger;
          return this.galleries.indexOf(that._id) > -1;
        }}).count() > 0;

    }});
  }
});

Template.biography.events({
  'click .js-menu': function() {
    Session.set(MENU_KEY, ! Session.get(MENU_KEY));
  }
});
