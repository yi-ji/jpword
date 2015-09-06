{
    appDir: './',
    baseUrl: './',
    dir: './dist',
    modules: [
        {
            name: 'main'
        }
    ],
    fileExclusionRegExp: /^(r|conf)\.js$/,
    optimizeCss: 'standard',
    removeCombined: true,
    paths: {
      // libs loader
      
      'text': 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',
      'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min',
      'underscore': 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min',
      'bootstrap': 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min',
      'backbone': 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.2/backbone-min',
      'jqueryUI': 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min',
      'jqueryUITouch': 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min',
      'backbone.csrf': 'libs/backbone-csrf',

      // views loader
      'wordItemView': 'views/word-item-view',
      'wordsCollectionView': 'views/words-collection-view',
      'loginRegisterView': 'views/login-register-view',

      // models loader
      'wordItem': 'models/word-item',

      // collections loader
      'wordsCollection': 'collections/words-collection',

      // templates loader
      'templates': 'templates',

      // application loader
      'app': 'apps/app',
      'router': 'apps/router',
      'baseRouter': 'apps/baserouter',

      // others
      'common': 'common'
    },
    shim: {
      underscore: {
        exports: '_'
      },
      backbone: {
        exports: 'Backbone',
        deps: ['jquery', 'underscore']
      },
      jquery: {
        exports: '$',
      },
      bootstrap: {
          deps: ['jquery']
      },
      jqueryUI: {
        deps: ['jquery']
      },
      jqueryUITouch: {
        deps: ['jqueryUI']
      }
    }
}