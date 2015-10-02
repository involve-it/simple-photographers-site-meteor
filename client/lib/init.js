/**
 * Created by aarutunyan on 2/15/15.
 */
window.app = window.app || {}
Meteor.startup(function () {
  if (Meteor.isClient) {
    setTimeout(function () {
      Tracker.autorun(function () {
        document.title = 'Photographer Yana Ishkova';
      });
    }, 400);

  }
});

