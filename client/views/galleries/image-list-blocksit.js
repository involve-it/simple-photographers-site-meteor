/**
 * Created by aarutunyan on 4/15/15.
 */
function initBlocks(container) {
  var offsetY, offsetX;
  offsetY = offsetX = 4;
  var colNum = $(document).width() / (250 + offsetX * 2);
  container.BlocksIt({
    numOfCol: colNum,
    offsetX: offsetX,
    offsetY: offsetY
    //blockElement: '.block'
  });
};
Template.imageListBlocksIt.rendered = function () {
  //close ad
  $('.buttonclose a').on('click', function () {
    $(this).parent().parent().fadeOut(1000);
    $(this).off('click');
    return false;
  });
//blocksit define
  //$(window).load( function() {

  /*$(".fancybox").fancybox({
   helpers: {
   overlay: {
   css: {
   //'background': '#250F0B' || 'black'
   'background': app.sceneController.getTimeColor() || 'black'
   }
   }
   }
   });*/
  //});
  var container = this.$('#photos-container');
  $(window).on('resize', function () {
    initBlocks(container);
  });
  initBlocks(container);
}
Template.imageListBlocksIt.helpers({
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
    initBlocks();
  }
});
Template.imageItemBlocksit.events({
  'click .controls-holder .remove': function(){
    Meteor.call('removePhoto', this._id);
  }
})
