Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'appBody',

  // the appNotFound template is used for unknown routes and missing lists
  notFoundTemplate: 'appNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  loadingTemplate: 'appLoading',

  // wait on the following subscriptions before rendering the page to ensure
  // the data it's expecting is present
  waitOn: function () {
    return [
      Meteor.subscribe('publicLists'),
      Meteor.subscribe('privateLists'),
      Meteor.subscribe('privateGalleryLists'),
      Meteor.subscribe('publicGalleryLists')
    ];
  }
});

dataReadyHold = null;
pageFadeInHold = null;

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();

  // Show the loading screen on desktop
  Router.onBeforeAction('loading', {except: ['join', 'signin']});
  Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});
}

Router.map(function () {
  this.route('join');
  this.route('signin');
  this.route('faces');
  this.route('recently-added');
  this.route('home', {
    path: 'home'
  });
  this.route('home', {
    path: '/',
    onBeforeAction: function(){
    }
  });
  //gallery:
  this.route('photographs', {
    path: '/photographs'
  });
  //biography:
  this.route('biography', {
    path: '/biography'
  });
  this.route('admin', {
    layoutTemplate: 'appBodyAdmin'
  })
  this.route('adminGallery', {
    path: '/admin/gallery',
    layoutTemplate: 'appBodyAdmin'
  });

  this.route('galleriesShow', {
    path: '/admin/gallery/:_id',
    layoutTemplate: 'appBodyAdmin',
    // subscribe to todos before the page is rendered but don't wait on the
    // subscription, we'll just render the items as they arrive
    onBeforeAction: function () {
      //this.todosHandle = Meteor.subscribe('todos', this.params._id);
      if (this.ready()) {
        // Handle for launch screen defined in app-body.js
        dataReadyHold.release();
      }
    },
    data: function () {
      return GalleryLists.findOne(this.params._id);
    },
    action: function () {
      this.render();
    }
  });
  this.route('uploads1', {
    path: '/uploads1/:path',
    where: 'server',
    action: function() {
      var fs = Npm.require('fs');

      var path = this.params.path;
      var basedir = process.env.PWD + '/public/uploads/';
      //var basedir = '~/app/';

      //console.log('will serve static content @ '+ path);
      //try {

      var file = fs.readFileSync(basedir + path);
      //} catch (ex) {
      //  console.log('Error while serving screenshot file: ' + ex);
      //}
      var headers = {
        'Content-type': 'image',
        'Content-Disposition': "inline; filename=" + path
      };

      this.response.writeHead(200, headers);
      return this.response.end(file);
    }
  });
});

if (Meteor.isClient) {

  Router.onBeforeAction('loading', {except: ['join', 'signin']});
  Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});

  // page transitions:
  var routerTriggeredCounter1 = 1;
  var routerTriggeredCounter2 = 1;
  var animateContentOut = function() {
    if(Router.current().route.name === 'photographs' || Router.current().route.name === 'biography') {
    } else {

      //$('#container').css('display', 'none');
    }
    routerTriggeredCounter1 += 1;
    //if(Router.current().route.name === 'home') {
    if (routerTriggeredCounter1 < 2) {
      $("#container").transition({
        opacity: 0,
        duration: 1,
        easing: 'in',
        complete: function () { /* ... */
        }
      });
    } else {
      routerTriggeredCounter1 = 0;
    }
    //}
    /*$("#container").transition({
      opacity: 0.1, scale: 0.3,
      duration: 500,
      easing: 'in',
      complete: function() { /!* ... *!/ }
    });*/
    //pageFadeInHold = LaunchScreen.hold();
    /*//$('.page').addClass('hidden');
    $('#container').removeClass("animated fadeIn");
    //$('.home--page').animate({height: "20px"}, 500)
    $('.home--page').addClass('animatable-grow');*/
    //return;
  }
  fadeContentIn = function() {
    if(Router.current().route.name === 'photographs' || Router.current().route.name === 'biography'){
      $('#menu').transition({y: -70});
      $('.site-title').transition({
        y: -80,
        duration: 600
      });
    } else {
      $('#menu').transition({y: 20});
      $('.site-title').transition({
        y: 0,
        duration: 600
      });
      //$('#container').fadeIn(200);
    }
    routerTriggeredCounter2 += 1;

    //if(Router.current().route.name === 'home') {
    if (routerTriggeredCounter2 < 2) {
      $("#container").transition({
        opacity: 1,
        duration: 600,
        easing: 'in',
        complete: function () { /* ... */
        }
      });
    } else {
      routerTriggeredCounter2 = 0;
    }
    //}

    /*$('#container').addClass("animated fadeIn");
    $('.home--page').addClass('animatable-grow');
    debugger;*/
    //pageFadeInHold.release();
    //return ;
  }

  // define this as a global onBeforeAction so it happens all the time
  Router.onBeforeAction(animateContentOut);

  // define this as a global onAfterAction so it happens all the time
  Router.onAfterAction(fadeContentIn);
}

/*  // page transitions:
 var animateContentOut = function() {
 debugger;
 $('#container').removeClass("animated fadeIn");
 //$('.home--page').animate({height: "20px"}, 500)
 $('.home--page').addClass('animatable-grow');
 //return;
 }
 fadeContentIn = function() {
 debugger;
 $('#container').addClass("animated fadeIn");
 $('.home--page').addClass('animatable-grow');

 //return ;
 }

 // define this as a global onBeforeAction so it happens all the time
 Router.onBeforeAction(animateContentOut);

 // define this as a global onAfterAction so it happens all the time
 Router.onAfterAction(fadeContentIn);*/