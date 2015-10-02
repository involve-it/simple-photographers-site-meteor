/**
 * Created by aarutunyan on 2/15/15.
 */

Template.language.created = function () {
  Tracker.autorun(function () {
    this.$('a.lang').show();
    var lang = Session.get('current_language');
    this.$('a#' + lang).hide();
  });

}
Template.language.events({
  'click a': function (e) {
    e.preventDefault();
    var lang = e.currentTarget.id;
    Meteor.I18n().lang(lang);
  }
});