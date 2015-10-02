/**
 * Created by aarutunyan on 4/15/15.
 */
if(Meteor.isClient){
  app.helpers = {}
  app.helpers.isAdmin = function(){
    var ret =  false;
    if(Meteor.user() && Meteor.user().emails && (Meteor.user().emails[0].address === 'forever.yana@gmail.com' || Meteor.user().emails[0].address === 'bigmature@gmail.com')) {
      ret = true;
    }
    return ret;
  }
}
