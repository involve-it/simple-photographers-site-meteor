/**
 * Created by aarutunyan on 4/16/15.
 */
Template.player.rendered = function(){
  var v = $('audio')[0];
  var me = new MediaElement(v, {success: function(media) {
    media.play();
  }});
}