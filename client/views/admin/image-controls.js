/*Template.imageUploadForm.events({
  'change .fileInput': function(event, template) {
    debugger;
    FS.Utility.eachFile(event, function(file) {
      var fsFile = new FS.File(file);
      fsFile.metadata = {owner: Meteor.userId()};
      Images.insert(fsFile, function (err, fileObj) {

      });
    });
  }
});*/
var event1;
Template.imageUploadForm.events({
  'change .fileInput': function(event, template) {
    event1 = event;
  },
  'click .btn-upload': function(){
    //var files = $('.fileInput')[0].files;
    var files = event1.target.files;
    var folderName = '/uploads1';
    var  i, ln;
    for (i = 0, ln = files.length; i < ln; i++) {
    //FS.Utility.eachFile(event1, function(file){
      PostImages.insert(files[i], function (err, fileObj) {
        //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
        if(fileObj.isImage()){
          var galleryId = this._id;
          var name = 'PostImages-'+PostImages.findOne(fileObj._id)._id + '-' + fileObj.name();

          var caption = template.$('.nameInput').val() || fileObj.name();
          var galleries = template.$('.galleriesInput').val();
          var galleries = galleries.split(' ').length === 0 ? template.$('.galleriesInput').val(): galleries.split(' ');
          galleries = _.without(_.union(galleries, [galleryId]), '');

          var timestamp = template.$('.timestampInput').val() || Date.now();
          var img = {name: name, path: folderName, galleries: galleries, timestamp: timestamp || fileObj.data.blob.lastModified, caption : caption}
          imgFiles.insert(img);
          //Meteor.call('called', files[i], a)
        }

      }.bind(this));
  }
    //)
  }
});

var imgData = {}
Template.imageUploader.rendered = function(){

}
Template.imageUploader.events({
   'keydown .nameInput': function(){
     imgData.caption = $('.nameInput').val();
   }
});
Template.imageUploader.helpers({
  formData: function(){

    /*var caption = template.$('.nameInput').val() || fileObj.name();
    var timestamp = template.$('.timestampInput').val() || Date.now();

    var data = {
      caption: caption,
      timestamp: timestamp
    }*/
    return {form: 'images', galleryId: this.galleryId, data: imgData}
  },
  myCallbacks: function() {
    return {

      validate: function(file) {
        file[0].name = $('.nameInput').val();
        return true;
      }
  }
}
})
Template.homeImageUploader.helpers({
  formData: function(){

    return {form: 'background'}
  }
})