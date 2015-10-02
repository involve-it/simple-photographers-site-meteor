/**
 * Created by aarutunyan on 2/15/15.
 */

if (Meteor.isServer) {
  var checkTranslations = function(){
    var translations = [
      {lang: 'it', base_str: 'Hello %s', new_str: 'Ciao %s'},
      {lang: 'en', base_str: 'Hello %s', new_str: 'Hello %s'},
      {lang: 'ru', base_str: 'Hello %s', new_str: 'Здравствуйте, %s'},

      {lang: 'it', base_str: 'Russian Language', new_str: 'Русская версия'},
      {lang: 'en', base_str: 'Russian Language', new_str: 'Русская версия'},
      {lang: 'ru', base_str: 'Russian Language', new_str: 'Русская версия'},

      {lang: 'it', base_str: 'English Language', new_str: 'English'},
      {lang: 'en', base_str: 'English Language', new_str: 'English'},
      {lang: 'ru', base_str: 'English Language', new_str: 'English'},

      {lang: 'it', base_str: 'Italian Language', new_str: 'Italiano'},
      {lang: 'en', base_str: 'Italian Language', new_str: 'Italiano'},
      {lang: 'ru', base_str: 'Italian Language', new_str: 'Italiano'},

      {lang: 'it', base_str: 'Photographer Yana Ishkova', new_str: 'Yana Ishkova saito!!'},
      {lang: 'en', base_str: 'Photographer Yana Ishkova', new_str: 'Yana Ishkova'},
      {lang: 'ru', base_str: 'Photographer Yana Ishkova', new_str: 'Фотограф Яна Ишкова'},
    ];
    var i18n = Meteor.I18n();

    for (var i in translations) {
      if (!i18n.collection.findOne({lang: translations[i].lang, base_str: translations[i].base_str})) {
        i18n.insert(translations[i].lang, translations[i].base_str, translations[i].new_str);
      }
    };
  };

  Meteor.startup(function(){
    // Check for translations each 1 hour
    // Fix for missing records on http://simple-i18n-sample.meteor.com/
    setInterval(checkTranslations, 3600000);
    checkTranslations();

    //Meteor.I18n();

  });

}
Meteor.startup(function(){
  // Init i18n package on server and client
  i18n = Meteor.I18n();

  if(Meteor.isClient){
    window.i18n = i18n;
  }
});