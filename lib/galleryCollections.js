GalleryLists = new Meteor.Collection('galleryLists');

// Calculate a default name for a list in the form of 'List A'
GalleryLists.defaultName = function () {
  var nextLetter = 'A', nextName = 'Gallery ' + nextLetter;
  while (GalleryLists.findOne({name: nextName})) {
    nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
    nextName = 'Gallery ' + nextLetter;
  }

  return nextName;
};

imgFiles = new Meteor.Collection('imgFiles');
//absUrlImages = null;

if (Meteor.isServer) {
  // read imgs from the upload dir:
  //absUrlImages = '/projects/test';
  //absUrlImages = process.env.PWD + "/public/uploads";
}
/*postImagesStoreFS = new FS.Store.GridFS ("imgs2", {
  path: absUrlImages
});*/

/*postImagesStoreFS = new FS.Store.FileSystem("imgs2", {
  path: absUrlImages
});

PostImages = new FS.Collection('PostImages', {
  stores: [postImagesStoreFS]
});*/
/*PostImages.find().observeChanges({
  added: function(){
    //debugger;
    console.log('added')
  },
  changed: function(){
    debugger;
    console.log('changed')

  }
})*/
//      Session.set("selectedPlayer", this._id);

if (Meteor.isClient) {
  //Meteor.subscribe('PostImages');
  Meteor.subscribe('imgsFiles');
  //Meteor.subscribe('absUrlImages');
}
called = function (arg1) {
  console.log(arg1)
}
if (Meteor.isServer) {

  Meteor.onConnection(function () {

    //imgFiles.remove({});

    /*var fs = Meteor.npmRequire('fs');
    var imgFilesArr = fs.readdirSync(absUrlImages);

    imgFilesArr.forEach(function (img) {
      if (img.toLowerCase().indexOf('.ds_store') === -1) {
        //imgFiles.insert({name: img, path: '/uploads'});

      }
    });*/
    Meteor.publish('imgsFiles', function () {
      return imgFiles.find();
    });
   /* Meteor.publish('PostImages', function () {
      return PostImages.find();
    });*/
    /*Meteor.publish('absUrlImages', function(){
     return absUrlImages;
     });*/
    /*Meteor.publish('galleryLists', function() {
     debugger;
     return GalleryLists.find();
     });*/
    Meteor.publish('publicGalleryLists', function () {
      return GalleryLists.find({userId: {$exists: false}});
    });

    Meteor.publish('privateGalleryLists', function () {
      if (this.userId) {
        return GalleryLists.find({userId: this.userId});
      } else {
        this.ready();
      }
    });
  });
  Meteor.methods({
    setHomePhoto: function (id) {
      imgFiles.update({}, {$set: {isHome: false}});
      imgFiles.update(id, {$set: {isHome: true}});
    },
    removePhoto: function (id) {
      var img = imgFiles.findOne(id);
      if(img){
        var path = /*process.env.PWD + img.path + */'/' + img.name;
        imgFiles.remove(id);
        UploadServer.delete(path);
      }


      return
    },
    getFileNamesInPublic: function(uploads){
      var path = uploads ?  '/public/uploads/' : '/public/';
      var fs = Meteor.npmRequire('fs');
      var Future = Meteor.npmRequire("fibers/future"),
        fut = new Future(), d = '';
      fs.readdir( process.env.PWD + path, function (err, files) {
        if (!err)
          d += files.join(', ');
        else
          d += err;
        fut.return(d);
      });
      return fut.wait();
    },
    getPaths: function(){
      var a = process.env.PWD;
      var b = typeof __dirname !== 'undefined'? __dirname : undefined;
      var c = process.env.TEMP_DIR;
      var d = '';


      //console.log("Fired callback.");
      return {
        a: a,
        b: b,
        c: c,
        d: d
      }
    }
    /*uploadPhoto: function(photo) {
      debugger;
      PostImages.insert(photo, function (err, fileObj) {
        debugger;
        //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
        if(fileObj.isImage()){
          var galleryId = this._id;
          var name = 'PostImages-'+PostImages.findOne(fileObj._id)._id + '-' + fileObj.name();

          var caption = template.$('.nameInput').val() || fileObj.name();
          var galleries = template.$('.galleriesInput').val();
          var galleries = galleries.split(' ').length === 0 ? template.$('.galleriesInput').val(): galleries.split(' ');
          galleries = _.without(_.union(galleries, [galleryId]), '');

          var timestamp = template.$('.timestampInput').val() || Date.now();
          var img = {name: name, path: '/uploads', galleries: galleries, timestamp: timestamp || fileObj.data.blob.lastModified, caption : caption}
          imgFiles.insert(img);
          //Meteor.call('called', files[i], a)
        }

      }.bind(this));
    }*/
  })
}
if(Meteor.isServer) {
  Meteor.startup(function () {
    UploadServer.init({
      tmpDir: process.env.PWD + '/public/uploads/tmp/',
      uploadDir: process.env.PWD + '/public/uploads/',
      checkCreateDirectories: true, //create the directories for you
      finished: function(fileInfo, formData){
        var path = '/uploads/';
        var folderName = '/uploads1';

        if(formData.form === 'background') {
          var name = fileInfo.name;
          var caption = fileInfo.name.substr(0,fileInfo.name.lastIndexOf('.'));
          //var caption = formData.data.caption;

          var timestamp = Date.now();
          var img = {isHome: true, name: name, path: folderName, galleries: [], timestamp: timestamp, caption : caption}
          imgFiles.find({}).forEach(function (img1) {
            img1.isHome = false;
            imgFiles.update(img1._id, img1);
          });

          imgFiles.insert(img);
        } else if (formData.form === 'images'){
          var galleryId = formData.galleryId;
          var name = fileInfo.name;
          var caption = fileInfo.name.substr(0,fileInfo.name.lastIndexOf('.'));
          //var caption = formData.data.caption;

          var galleries = [galleryId];

          //var timestamp = template.$('.timestampInput').val() || Date.now();
          var timestamp = Date.now();
          var img = {isHome: false, name: name, path: folderName, galleries: galleries, timestamp: timestamp, caption : caption}

          imgFiles.insert(img);
        }
        /*debugger;
        //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
        if(fileObj.isImage()){
          var galleryId = this._id;
          var name = 'PostImages-'+PostImages.findOne(fileObj._id)._id + '-' + fileObj.name();

          var caption = template.$('.nameInput').val() || fileObj.name();
          var galleries = template.$('.galleriesInput').val();
          var galleries = galleries.split(' ').length === 0 ? template.$('.galleriesInput').val(): galleries.split(' ');
          galleries = _.without(_.union(galleries, [galleryId]), '');

          var timestamp = template.$('.timestampInput').val() || Date.now();
          var img = {name: name, path: '/uploads', galleries: galleries, timestamp: timestamp || fileObj.data.blob.lastModified, caption : caption}
          imgFiles.insert(img);
          //Meteor.call('called', files[i], a)
        }*/
      }
    })
  });
}