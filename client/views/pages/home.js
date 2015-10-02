var ERRORS_KEY = 'homeErrors';
Template.home.created = function() {
  Session.set(ERRORS_KEY, {});
};
Template.home.rendered = function(e, v){
  //$('.home--page').addClass('animatable-grow');
  var h = $('.page').height() - $('#gallery').height();
  $('.background-holder').height(h);
}

Template.home.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  },
  homePhoto: function(){
    //debugger;
    var img = imgFiles.findOne({isHome: true}), ret = '';
    if(img){
      ret = '"' + img.path + '/' + img.name + '"'
    }
    return ret;
  }
});

Template.home.events({
  'click .js-menu': function() {
    Session.set(MENU_KEY, ! Session.get(MENU_KEY));
  },
  'click .admin-change-background-holder a': function(){
    debugger;
  }
});