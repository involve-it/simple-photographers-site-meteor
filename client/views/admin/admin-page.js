/**
 * Created by ashot on 5/6/15.
 */
Template.admin.rendered = function(){

}
Template.admin.events({
  'click #save-biography-text': function(){
    var text = $('.admin--biography-text-input').val();
    if(text) {
      if(ContentCollection.findOne({key: 'biographyPage'})) {
        ContentCollection.update(ContentCollection.findOne({key: 'biographyPage'})._id, {
          key: 'biographyPage',
          value: text
        });
      } else {
        ContentCollection.insert({
          key: 'biographyPage',
          value: text
        });
      }
      alert('Biography updated.');
    } else {
      alert('Please put text in the text area.');
    }
  }
})
