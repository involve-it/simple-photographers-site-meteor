/**
 * Created by aarutunyan on 4/11/15.
 */
app = window.app
var sceneController = {}
//app.sceneController.getSunInclination(new Date("Sat Apr 11 2015 9:05:31 GMT-0700 (PDT)"))
sceneController.getSunInclination = function(date){
  var ret = 0, i;
  //var d = new Date("Sat Apr 11 2015 10:00:31 GMT-0700 (PDT)"),
  //var d = new Date("Sat Apr 11 2015 06:35:31 GMT-0700 (PDT)"),
  if(date && typeof date === 'string'){
    date = new Date(date);
  }
  var d = date || new Date(),
    m = d.getMinutes(),
    h = d.getHours(),
    s = d.getSeconds(),
    t, t1, t2, t3, i1, i2, i3,
    t4 = 6.5, t5 = 20, tmid = t4 + (t5-t4)/ 2,
    i4 = 0.516, i5 = 0;
  // t is between 6 -> 13 -> 20, 20->6
  // i is between 0.6 -> 0 -> 0.6, 0.6
  // use this for better calculation:
  //http://solarelectricityhandbook.com/solar-angle-calculator.html
  t = h + (1/60) * m + (1/3600) * s;
  sceneController.isNight = function (){
    var ret = true;
    ret = t > t5 || t < t4;
    return ret;
  }
  sceneController.getTheme = function (){
    var ret = 'day';
    if(sceneController.isNight()){
      ret = 'night'
    } else {
      if (t > t4 && t < 7.5){ // sunrise:
        ret = 'sunrise'
      } else if(t > 7.5 && t < 19){// blue sky:
        ret = 'day';
      } else if(t > 19 && t < t5){// sunset:
        ret = 'sunset';
      }
    };
    return ret;
  }
  sceneController.getTimeColor = function (){
    var ret = 'white';
    if(sceneController.isNight()){
      ret = 'black'
    } else {
      if (t > t4 && t < 7.5){ // sunrise:
        ret = '#250F0B'
      } else if(t > 7.5 && t < 19){// blue sky:
        ret = '#83B2CE';
      } else if(t > 19 && t < t5){// sunset:
        ret = '#250F0B';
      }
    };
    return ret;
  }
  if (sceneController.isNight()) {       //night
    i = i4;
  } else {                      // day
    if(t >= t4 && t <= tmid ) { // am
      t1 = t4, t2 = tmid
      i1 = i4, i2 = i5;
    } else {                    // pm
      t1 = tmid; t2 = t5;
      i1 = i5; i2 = i4;
    }
    i = ((t - t1) * (i2 - i1) + i1 * (t2 - t1)) / (t2 - t1);
  }
  ret = Math.abs(i);
  /*if (t > 20 && t < 6) {  //night
    i = 0.6;
  } else {                // day
    if(t >= 6 && t <=13 ) {
      i = (0.6 + 0.6 * t) / 7;
    } else {
      i = (-7.8 + 0.6 * t) / 7;
    }
  }*/



  return ret;
  //return 0.51;
}
sceneController.getSunInclination();

app.sceneController = sceneController;