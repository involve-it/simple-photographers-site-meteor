/**
 * Created by ashot on 5/6/15.
 */

Template.homePageImage.rendered = function(){

}
Template.homePageImage.events({
  'click .add-new-photo-btn': function (event, template) {
    template.$('.imgUploadFormHolder').toggle(function (el) {
      if (template.$('.add-new-photo-btn').val() !== 'Hide') {
        template.$('.add-new-photo-btn').val('Hide');
      } else {
        template.$('.add-new-photo-btn').val('Add new photo');
      }
    });
  }
})