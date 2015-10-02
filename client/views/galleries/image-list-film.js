Template.imageListFilm.rendered = function () {
  /*$('.scrolled-content').mCustomScrollbar({
   axis:"x",
   //theme:"dark",
   //setWidth: '100%',
   setHeight: '220px',
   scrollbarPosition: 'outside',
   alwaysShowScrollbar: 2,
   advanced:{ autoExpandHorizontalScroll: true },
   callbacks:{
   onOverflowX: function(){
   debugger;
   }
   }
   });*/
  $("#scroll-holder").mCustomScrollbar({
    axis:"x", // horizontal scrollbar
    scrollbarPosition: 'inside',
    theme:"rounded",
    //theme: 'light-thick',
    //theme:"3d",
    setWidth: '100%',

    scrollButtons:{
      enable: true,
      scrollType: "stepped",
      scrollAmount: 204
    },
    callbacks:{
      onInit: function(){
        //$('.mCSB_horizontal.mCSB_inside > .mCSB_container').css('margin-bottom', '-8px');
        //$('.mCSB_scrollTools.mCSB_scrollTools_horizontal').css('margin-bottom', '-3px');
      }
    }
  });
  $(".fancybox").fancybox({
    helpers: {
      overlay: {
        css: {
          'background': 'black'
        }
      }
    }
  });
}
Template.imageListFilm.helpers({
  images: function () {
    var galleryId = this.galleryId || this.galleryName && GalleryLists.findOne({name: this.galleryName}) && GalleryLists.findOne({name: this.galleryName})._id;
    if (galleryId) {
      if (GalleryLists.findOne(galleryId).name === "Recent Photos") {
        return imgFiles.find();
        //return imgFiles.find().sort( { timestamp: 1 }).limit(3);
      } else {
        return imgFiles.find({galleries: galleryId}); // Where Images is an FS.Collection instance
      }
    } else {
      return imgFiles.find(); // Where Images is an FS.Collection instance
    }

  }
});

//Example data for the list item
Template.imageItem.formattedUploadedDate = function () {
  return new Date(this.uploadDate);
};
Template.imageItem.formatedSize = function () {
  return Math.round(this.length / 1024) + " KB";
};
//Handle the click events on the image in the list, sets the selectedImageItemId and shows the modal
Template.imageItem.events = {

  "click .open-modal": function (e, t) {
    e.preventDefault();
    Session.set("selectedImageId", t.data._id);
    $('#imageModal').modal().modal("show");
  }
};