// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  //Lists.remove({});
  //GalleryLists.remove({});
  //Todos.remove({});
  //imgFiles.remove({});

  if (Lists.find().count() === 0) {
    var data = [
      /*{
        name: "Good Morning Photo",
        items: []
      },
      {
        name: "Sunset near house of vikings",
        items: []
      },
      {
        name: "Getsi Village",
        items: []
      }*/
    ];
    var timestamp = (new Date()).getTime();
    _.each(data, function(list) {
      var list_id = Lists.insert({name: list.name,
        incompleteCount: list.items.length});

      _.each(list.items, function(text) {
        Todos.insert({listId: list_id,
          text: text,
          createdAt: new Date(timestamp)});
        timestamp += 1; // ensure unique timestamp.
      });
    });
  }
  //GalleryLists.remove({});

  // bootstrap content:
  // default home page image
  /*imgFiles.insert({
    name: 'Barca.jpeg',
    path: '/uploads',
    isHome: true
  });*/
  /*ContentCollection.insert({
    key: 'biographyPage',
    value: 'Put initial value here'
  })*/
  /*if (GalleryLists.find().count() === 0) {
    var data1 = [
      {
        name: "Recent Photos",
        items: []
      },
      {
        name: "My Favorites",
        items: []
      },
      {
        name: "Los Angeles",
        items: []
      }
    ];
    _.each(data1, function(list) {
      var list_id = GalleryLists.insert({name: list.name,
        incompleteCount: list.items.length});

    });
  }*/
  if(Meteor.isServer) {
    //debugger;
  }
});
